// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
module.exports = {
    name: "theme", 
    category: "info", 
    aliases: ["bd", "th"], 
    cooldown: 5, 
    usage: "theme", 
    description: "Wysyła autorksi theme do better discord zrobiony przez Kacperka <3", 

  run: async (client, message, args, user, text, prefix) => {
      message.channel.send('Dzięki wielkie! Oceń ten theme na <#795774502763888662>', { files: ["./darkcom-orginal.theme.css"] });
  }
}