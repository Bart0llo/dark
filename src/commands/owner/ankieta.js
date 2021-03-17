const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json')
module.exports = {
    name: "ankieta", 
    category: "admin",  
    cooldown: 5, 
    usage: "ankieta <tekst>", 
    description: "Tworze ankiete", 

  run: async (client, message, args, user, text, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return
let comment = args.join(" ");
    if(!comment) return message.channel.send(message, "Podaj tekst.");

    let ideaEmbed = new MessageEmbed()
    .setTitle("**Ankieta**")
    .setColor("RANDOM")
    .setDescription(comment)
    .setFooter(`Zaznasz reakcję!`)
    .setTimestamp()

    let channel = client.channels.cache.get("795774501345689684");
    if(!channel) return errors.noChannel(message, "Nie znaleziono kanału.")
  
  const send = await channel.send(ideaEmbed)
    await send.react("<:dark_yes:815350884837359675>");
    await send.react("<:dark_spierdalaj_pan:815350905720930304>");
    message.channel.send('Ankieta wysłana');
  }
}