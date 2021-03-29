// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say", 
    category: "przydatne", 
    aliases: ["say", "powiedz", "napisz"], 
    cooldown: 5, 
    usage: "say <Tektst>", 
    description: "Bot wysyła twoją wiadomość", 

 
    run: async (client, message, args, user, text, prefix) => {	
        if(message.member.hasPermission('ADMINISTRATOR') || message.author.id === "798896203097833492") {
        message.delete();
        message.channel.startTyping();
        setTimeout(function(){
        message.channel.stopTyping()
        message.channel.send(text) 
        }, 1000)
        }
        else {
            const embed = new MessageEmbed()
            .setAuthor('Error!',"https://cdn.discordapp.com/emojis/824669794434940948.png?v=1")
            .setDescription('**Nie posiadasz wymaganych uprawnień!**')
            .setColor("#ff0000")
            message.channel.send(embed)
        }
    }
}
