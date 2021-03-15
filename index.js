// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś

const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json"); 
const prefix = (config.prefix); 
const fs = require("fs"); 

const client = new Client({
    ws: { properties: { $browser: "Discord Android" }},
    disableEveryone: true,  
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
}); 

client.commands = new Collection(); 
client.aliases = new Collection(); 


client.categories = fs.readdirSync("./src/commands/"); 

["command"].forEach(handler => {
    require(`./src/handlers/command`)(client);
}); 
const eventhandler = require("./src/handlers/events"); 
eventhandler(client); 




if (config.type === "dev") {
  client.login(config.tokendev)
} else 
if (config.type === "normal") {
client.login(config.token);
}