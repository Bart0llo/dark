const Discord = require('discord.js')

module.exports = {
    name: "resetchannel",
    description: "Resets the channel.",
    category: "Tools",
    botPermission: ["ADMINISTRATOR"],
    authorPermission: ["ADMINISTRATOR"],
    aliases: ["rchannel"],
    usage: "resetchannel",
    ownerOnly: false,
    run: async (client, message, args, errorEmbed, succesEmbed) => {
        let channel = await message.channel.clone();

        await message.channel.delete();

        const e = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`**Kanał został rozjebany przez:** ${message.author.tag}`)  
        .setImage("https://cdn.discordapp.com/attachments/821868906791698446/828304189704634378/gif-explosion-73.gif")
       
        if (channel) channel.send(e);
    }


}
