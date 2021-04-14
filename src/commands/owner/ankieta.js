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
    .setFooter(`Zaznacz reakcję!`)
    .setTimestamp()

    let channel = client.channels.cache.get("827663462708674600");
    if(!channel) return errors.noChannel(message, "Nie znaleziono kanału.")
  
  const send = await channel.send(ideaEmbed)
    await send.react("<:VoteUp:828032799985762365>");
    await send.react("<:VoteDown:828032827085029407>");
    message.channel.send('Ankieta wysłana');
  }
}
