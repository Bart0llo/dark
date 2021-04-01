// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const { MessageEmbed } = require("discord.js");
const categories = require("../../JSON/kategorie.json");
const { owners } = require("../../../config.json");
const paginate = require("../../modules/pages");



module.exports = {
    
        name: "pomoc", 
        category: "info", 
        aliases: ["h", "help"], 
        cooldown: 5, 
        usage: "pomoc [Komenda]",
        description: "Zwraca wszystkie polecenia lub jedno określone polecenie", 

        
    run: async (client, message, args, user, text, prefix) => {

      const embed = new MessageEmbed()
        .setColor("#00FF00")
        .setAuthor(`Help Menu`, "https://cdn.discordapp.com/emojis/823695577288015902.png?v=1")
        .setThumbnail("https://cdn.discordapp.com/emojis/821872253682581565.png?v=1")
        .setDescription('\n> <:member:822198810306412594> **Witaj!** Jestem prywatnym botem Serwera **Dark.Com**\n\n> <a:BotDeveloper:823693389459226716>｜**Komendy Developerskie:**\n> `eval`\n\n> <:shield:823693241429655583>｜**Komendy Administratorskie:**\n> `say`**,**`ankieta`\n\n> <:member:822198810306412594>｜**Komendy dostępne dla członków:**\n> `uptime`**,**`link`**,**`ping`**,**`avatar`')
        .setFooter(`Wykonałem dla: ${message.author.tag}`, message.author.displayAvatarURL( ({dynamic: true})))
        message.channel.startTyping();
        setTimeout(function(){
        message.channel.stopTyping()
        message.channel.send(embed)
    }, 1000)
    }
    }
