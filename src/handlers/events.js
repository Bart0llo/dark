// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const fs = require("fs");  
const ascii = require("ascii-table"); 

let table = new ascii("Events"); 
table.setHeading("Events", "Load status");

module.exports = async (client) => {
    let theevents; //global variable
    fs.readdirSync("./src/events/").forEach(file => { //reading each command
        theevents =  fs.readdirSync(`./src/events/`).filter(file => file.endsWith(".js")); 
        fs.readdir("./src/events/", (err, files) => { 
            if (err) return console.error(err);
                    const event = require(`../events/${file}`); 
                    let eventName = file.split(".")[0]; 
                    theevents = eventName; 
                    client.on(eventName, event.bind(null, client)); 
            });
    });
    
    
    for(let i = 0; i< theevents.length; i++){
        try {
            table.addRow(theevents[i], 'Ready'); 
        } catch (error) {
            console.error(error.stack); 
        }
    }
    console.log(table.toString()); 
	console.log(`Statystyki : \n\nBot jest na ${client.guilds.cache.size} serwerach. \nW sumie ${client.users.cache.size} osób.`)
}
