// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const { readdirSync } = require("fs"); 
const ascii = require("ascii-table"); 

let table = new ascii("Commands"); 
table.setHeading("Komendy", "Status");

console.log("Czekaj ładuje...") 

module.exports = (client) => {
    readdirSync("./src/commands/").forEach(dir => { 
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js")); 
        for (let file of commands) { 
            let pull = require(`../commands/${dir}/${file}`); 
            if (pull.name) { 
                client.commands.set(pull.name, pull); 
                table.addRow(file, 'Aktywny'); 
            } else {
                table.addRow(file, `error -> missing a help.name, or help.name is not a string.`); 
                continue; 
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); 
        }
    });
    console.log(table.toString()); 

}
