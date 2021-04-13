// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const Discord =  require('discord.js')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "nakładka", 
    category: "przydatne", 
    aliases: ["nakladka", "n"], 
    cooldown: 2, 
    usage: "nakładka", 
    description: "Nasza nakładka na twój profil", 

 
    run: async (client, message, args, user, text, prefix) => {

const wiad = await message.channel.send('**<a:loading:824403112907374602> Generowanie, proszę czekać...**')
const Canvas = require('canvas')
const canvas = Canvas.createCanvas(1000, 1000);
const ctx = canvas.getContext('2d');



const background = await Canvas.loadImage(message.author.displayAvatarURL({dynamic: true, format: 'png', size: 2048}));    
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


const avatar = await Canvas.loadImage("./nakladka.png");
ctx.drawImage(avatar, 0, 0, 1000, 1000);

const koniec = new Discord.MessageAttachment(canvas.toBuffer(), 'nakładka.png');

message.channel.startTyping();
        setTimeout(function(){
            message.channel.stopTyping();
message.channel.send(koniec)
wiad.edit('**Trzymaj!**', koniec)
        }, 3000)
    }
}
