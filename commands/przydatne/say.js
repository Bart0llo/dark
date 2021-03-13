const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say", 
    category: "przydatne", 
    aliases: ["say", "powiedz", "napisz"], 
    cooldown: 2, 
    usage: "say <Tektst>", 
    description: "Bot wysyła twoją wiadomość", 

 
    run: async (client, message, args, user, text, prefix) => {	
        if(message.member.hasPermission('ADMINISTRATOR')) {
        message.delete();
        message.channel.send(text) 
        }
        else {
            const embed = new MessageEmbed()
            .setDescription('**Nie dla psa**')
            message.channel.send(embed)
        }
    }
}