const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

client.on('ready', () => {
  console.log(`Logged in as!`);
});

client.on('message', async msg => {
    if (msg.content === '>nakladka') {
        msg.channel.send('**Generowanie...**')
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');



    const background = await Canvas.loadImage(msg.author.displayAvatarURL({dynamic: true, format: 'png', size: 2048}));    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  
    const avatar = await Canvas.loadImage('./nakladka.png');
    ctx.drawImage(avatar, 0, 0, 1000, 1000);

    const koniec = new Discord.MessageAttachment(canvas.toBuffer(), 'nakładka.png');

   

    msg.channel.send('**Wygenerowano!**', koniec)
    }
});

client.login(config.token);