// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../config.json"); 
const prefix = (config.prefix); 
const owners = (config.owners);
const fs = require("fs"); 
const cooldowns = new Collection(); 

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return; 

    if ( 
      (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) 
    ) {
      const embed = new MessageEmbed()
        .setTitle('**<:PeepoPing:815349357058064397>No i po co mnie pingujesz.**')
        .setDescription(`Skoro mnie pingłeś to użyj komendy \`${prefix}pomoc\` Tam masz ciekawsze rzeczy<:peepopog:815324694927900705>`)
        .setColor(message.member.displayHexColor);
        message.channel.startTyping();
        setTimeout(function(){
            message.channel.stopTyping();
      message.channel.send(embed);
        }, 1000 )
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

    if (command.botOwnersOnly) {
      const botOwnersOnly = command.botOwnersOnly;

      if (message.author.id !== owners[0] && message.author.id !== owners[1])
        return message.reply("Tylko właściciel może używać tego polecenia");
    }
    if (command.botPermission) {
      let neededPerms = [];

      command.botPermission.forEach((p) => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          `Potrzebujesz ${neededPerms.join(
            ", "
          )} permisji do wykonania tego polecnia!`
        );
    } else if (command.memberPermission) {
      let neededPerms = [];

      command.memberPermission.forEach((p) => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          `Potrzebujesz ${neededPerms.join(
            ", "
          )} permisji do wykonania tego polecenia!`
        );
    }
}