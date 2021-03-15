const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "info",
    usage: "ping",
    description: "Uzyskaj ping bota!",
    cooldown: 10,

    run: async (client, message, args, user, text, prefix) => {
        message.channel.startTyping();
    setTimeout(function(){
        message.channel.stopTyping();
        message.channel.send("Testowanie pingu...").then(async (m) => {
            let randomColor = "RED";
            let dataPing = Date.now();
            let dataPingNow = Date.now();
            let dataRealPing = dataPingNow - dataPing;
            const embed = new MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setTitle("🏓 Pong!")
              .setDescription(
                `Czas oczekiwania bota - **${Math.round(
                  (m.createdAt - message.createdAt) / client.ws.ping
                )}**ms \nCzas oczekiwania bota - **${Math.round(
                  m.createdAt - message.createdAt
                )}**ms \nCzas oczekiwania API - **${Math.round(
                  client.ws.ping
                )}`
              )
              .setColor("#8e00ff");
              
            m.edit(embed);
          });
        }, 1000)
    }
}