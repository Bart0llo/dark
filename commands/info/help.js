const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../config.json");


module.exports = {
    
        name: "pomoc", 
        category: "info", 
        aliases: ["h", "commandinfo", "help"], 
        cooldown: 5, 
        usage: "pomoc [Komenda]",
        description: "Zwraca wszystkie polecenia lub jedno określone polecenie", 

        
    run: async (client, message, args, user, text, prefix) => {
        if(args[0]){ 
            return getCMD(client,message,args[0]);
        }
        else{ 
            return getAll(client, message);
        }
    }
}

function getAll(client,message){
const embed = new MessageEmbed() 
    .setColor(message.member.displayHexColor)
    .setThumbnail(message.author.displayAvatarURL())
    .setTitle("Menu pomocy")
    .setFooter(`Aby zobaczyć opisy poleceń i informacje, użyj: ${config.prefix}pomoc [Nazwa polecenia]`, client.user.displayAvatarURL())
    const commands = (category) => { 
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``).join(", ")
    }
    
    const info = client.categories.map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__**\n> ${commands(cat)}`)
    .reduce((string, category) => string + "\n" + category);
    message.channel.startTyping();
        setTimeout(function(){
            message.channel.stopTyping();
    return message.channel.send(embed.setDescription(info))
        }, 1000);
}


function getCMD(client,message,input){
    const embed = new MessageEmbed() 
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())) //getting the command by name/alias
    if(!cmd){ 
        return message.channel.send(embed.setColor("RED").setDescription(`Brak informacji o tym poleceniu **${input.toLowerCase()}**`));
    }
    if(cmd.name) embed.addField("**Nazwa polecenia**", `\`${cmd.name}\``)
    if(cmd.description) embed.addField("**Opis**", `\`${cmd.description}\``);

    if(cmd.aliases) embed.addField("**Aliasy**", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
    if(cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Sekund\``)
        else embed.addField("**Cooldown**", `\`1 Sekund\``)
    if(cmd.usage){
        embed.addField("**Użycie**", `\`${config.prefix}${cmd.usage}\``);
        embed.setFooter("Składnia: <> = wymagane, [] = optionalne"); 
    }
    message.channel.startTyping();
        setTimeout(function(){
            message.channel.stopTyping();
    return message.channel.send(embed.setColor(message.member.displayHexColor))
        }, 1000);
}
