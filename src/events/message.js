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
      function duration(ms) { 
        const sec = Math.floor(ms / 1000 % 60).toString();
        const min = Math.floor(ms / (60*1000) % 60).toString();
        const hrs = Math.floor(ms / (60*60*1000) % 60).toString();
        const days = Math.floor(ms / (24*60*60*1000) % 60).toString();
        return `\`${days} Dni\`, \`${hrs} Godzin\`, \`${min} Minut\`, \`${sec} Sekund\``
    }
        const em = new MessageEmbed()
    .setDescription('<a:loading:824403112907374602> Ładowanie...')
    message.channel.send(em).then (async (m) =>{
      const embed = new MessageEmbed()
      .setAuthor(`Oznaczono bota!`, "https://cdn.discordapp.com/emojis/823695577288015902.png?v=1")
      .setDescription(`\n> <a:witajcie:822198468436689020> **Witaj!** Jestem prywatnym botem Serwera **Dark JET**\n\n>  <:kolko:821871660378095636> *Mój prefix na tym serwerze to* **${prefix}**\n> \n> <:kanal:821871583155978313> *Aby uzyskać pomoc, wpisz*: ***${prefix}pomoc*** \n> \n> <a:loading:824403112907374602> *Mój obecny ping wynosi*: **${Math.round((m.createdAt - message.createdAt) / client.ws.ping)}** \n\n>  <:check:821871647064981516> *Statystyki:*\n> \n>  *<a:aDiscord:823693464306581565> Serwery*: ** ${client.guilds.cache.size}** \n> \n> *<:member:822198810306412594> Użytkownicy:* ** ${client.users.cache.size}** \n> \n> *<:online:822197931682955274> Jestem aktwyny od:* **${duration(client.uptime)}**`)
      .setFooter(`Wykonałem dla: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
        .setColor("#00FF00");
        message.channel.startTyping();
        setTimeout(function(){
            message.channel.stopTyping();
      m.edit(embed);
        }, 1000 )
      })
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
