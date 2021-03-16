const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "changemymind",
  category: "zdjęcia",
  aliases: ["cm"],
  description: "Powiedz komuś, żeby zmienił zdanie XD",
  usage: "changemymind <tekst>",
  cooldown: 4,
  run: async (client, message, args) => {
    const text = args.join(" ");

    if (!text) return message.channel.send("Podaj tekst").then(message => {
        message.delete({ timeout: 3000 })
    });

    const sendMsg = await message.channel.send("⚙ Przetwarzanie obrazu..");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());

    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Kliknij tutaj, jeśli nie udało się załadować obrazu.](${data.message})`
      )
      .setImage(data.message)
      .setTimestamp();
      message.channel.startTyping();
      setTimeout(function(){
    message.channel.send({ embed });
    message.channel.stopTyping(); 
}, 1000)
  },
};