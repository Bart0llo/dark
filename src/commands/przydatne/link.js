const fetch = require("node-fetch");
module.exports = {
    name: "link", 
    category: "przydatne", 
    aliases: ["url", "n"], 
    cooldown: 5, 
    usage: "link <url>", 
    description: "Skracam link", 

  run: async (client, message, args, user, text, prefix) => {
    const url = args.join(" ");
    if (!url)
      return message.reply(
        "Zapomniałeś adresu URL! Podaj URL np: https://twojastara.pl"
      );
    const data = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    ).then((res) => res.json());
    message.channel.startTyping();
    setTimeout(function(){
        message.channel.stopTyping();
    return message.channel.send("Twój skrócony link....  " + data.shorturl);
    }, 1000)
  }
}