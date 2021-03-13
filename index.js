//Modules
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json"); 
const prefix = (config.prefix); 
const fs = require("fs"); 

const client = new Client({
    ws: { properties: { $browser: "Discord Android" }},
    disableEveryone: true,  
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
}); 

client.commands = new Collection(); 
client.aliases = new Collection(); 
const cooldowns = new Collection(); 

client.categories = fs.readdirSync("./commands/"); 

["command"].forEach(handler => {
    require(`./handlers/command`)(client);
}); 
const eventhandler = require("./handlers/events"); 
eventhandler(client); 


client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return; 

    if ( 
      (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) 
    ) {
      const embed = new MessageEmbed()
        .setTitle('**No i po co mnie pingujesz.**')
        .setThumbnail('https://cdn.discordapp.com/emojis/818868691595689995.png?v=1')
        .setDescription(`Skoro mnie pingłeś to urzyj komendy \`${prefix}pomoc.\` Tam masz ciekawsze rzeczy`)
        .setColor(message.member.displayHexColor);
      message.channel.send(embed);
    }
    if (!message.content.startsWith(prefix)) return; 
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
    const cmd = args.shift().toLowerCase(); 
    
    if (cmd.length === 0) return; 
    
    let command = client.commands.get(cmd); 
    if (!command) command = client.commands.get(client.aliases.get(cmd)); 

   
    if (command) 
    {
        if (!cooldowns.has(command.name)) { 
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now(); 
        const timestamps = cooldowns.get(command.name); 
        const cooldownAmount = (command.cooldown || 1) * 1000; 
      
        if (timestamps.has(message.author.id)) { 
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; 
      
          if (now < expirationTime) { 
            const timeLeft = (expirationTime - now) / 1000; 
            return message.reply( 
              `Poczekaj jeszcze ${timeLeft.toFixed(1)} sekund zanim użyjesz \`${command.name}\`.`
            ); 
          }
        }
      
        timestamps.set(message.author.id, now); 
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
      try{
        command.run(client, message, args, message.author, args.join(" "), prefix); 
      }catch (error){
        console.log(error)
        return message.reply("Coś poszło nie tak podczas używania: `" + command.name + "`")
      }
    } 
    else 
    return message.reply(`Nie prawidłowe polecenie, spróbuj: **\`${prefix}help\`**`)

    
    
});

client.login(config.token); 