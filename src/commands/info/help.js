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
        aliases: ["h", "commandinfo", "help"], 
        cooldown: 5, 
        usage: "pomoc [Komenda]",
        description: "Zwraca wszystkie polecenia lub jedno określone polecenie", 

        
    run: async (client, message, args, user, text, prefix) => {
    
        
    const isBotOwner = owners.includes(message.author.id);

    const commands = [
      ...client.commands.array(),
    ];
    if (args[0] && categories.includes(args[0])) {
      const cmds = commands
        .filter(({ category }) => category === args[0].toLowerCase())
        .map(({ name }) => name)
        .join(", ");
      if (cmds.length < 0)
        return message.channel.send("Nie ma kategorii o tej nazwie");
      const le = new MessageEmbed().setTitle(`${args[0]}`);
      if (args[0] === "owner") {
        if (isBotOwner) {
          le.setDescription(`\`\`\`${cmds}\`\`\``);
        } else {
          le.setDescription("Tylko dla właścicieli ¯_(ツ)_/¯");
        }
      } else {
        le.setDescription(`\`\`\`${cmds}\`\`\``);
      }
      message.channel.send(le);
    } else if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Nieprawidłowa polecenie: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Opis", command.description || "Brak")
        .addField(
          "Użycie",
          "`" + command.usage ? command.usage : "Brak" + "`"
        )
        .addField(
          "Aliasy",
          command.aliases ? "`" + command.aliases + "`" : "Brak"
        )
        .addField("Cooldown", command.cooldown ? command.cooldown : "Brak");
      embed
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(message.member.displayHexColor)
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      

      const embeds = [];

      const categories = client.commands
        .map((c) => c.category)
        .reduce((a, b) => {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, [])
        .sort();
      for (const category of categories) {
        let commands = client.commands.filter(
          (c) => c.category.toLowerCase() === category.toLowerCase()
        );

        commands = commands.filter((c) => c.name).map((c) => `\`${c.name}\``);
        let emx = new MessageEmbed()
          .setTitle(`Obecna kategoria: ${category}`)
          .setColor(message.member.displayHexColor)
          .setThumbnail(client.user.displayAvatarURL());
        emx.addField(category, `${commands.sort().join(", ")}`);
        embeds.push(emx);
      }
      await paginate(message, embeds);
    }
  },
}