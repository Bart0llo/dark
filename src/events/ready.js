// Dark.Com - Bot
// Author: Bartuś - https://github.com/Bart0llo/
//
// Copyright 2021, Bartuś
const config = require('../../config.json');
module.exports = async (client) => {
    console.log(`Discord Bot ${client.user.tag} jest aktywny`); 
    
//--------------------[Tryb: developera]--------------------//   
    
    if (config.type === "dev") {
        const activities = [
            { name: 'Wersja beta', type: 'LISTENING' }, 
            { name: '@Dark.Com Beta', type: 'LISTENING' }
          ];
        
          
          client.user.setPresence({ status: 'online', activity: activities[0] });
        
          let activity = 1;
        
          
          setInterval(() => {
            activities[2] = { name: `Nowe funckcje`, type: 'WATCHING' }; 
            activities[3] = { name: ``, type: 'WATCHING' }; 
            if (activity > 3) activity = 0;
            client.user.setActivity(activities[activity]);
            activity++;
          }, 30000); //"PLAYING", "WATCHING", "LISTENING", "STREAMING" ("https://twitch.tv/#")
      } else 
      
//--------------------[Typ: normalny]-------------------/      
      
      if (config.type === "normal") {
        const activities = [
            { name: 'Cześć 😘', type: 'WATCHING' }, 
            { name: 'd.pomoc Zobacz co potrafię!', type: 'WATCHING' }
          ];
        
          
          client.user.setPresence({ status: 'online', activity: activities[0] });
        
          let activity = 1;
        
          
          setInterval(() => {
            activities[2] = { name: `@Chill Zone Poland 😍`, type: 'WATCHING' }; 
            activities[3] = { name: `Odwiedziło nas: ${client.users.cache.size} osób`, type: 'WATCHING' }; 
            activities[4] = { name: `Cześć mogę cię zjeść?`, type: 'WATCHING' };
            if (activity > 4) activity = 0;
            client.user.setActivity(activities[activity]);
            activity++;
          }, 30000); // "PLAYING", "WATCHING", "LISTENING", "STREAMING" (dodać link: "https://twitch.tv/#")
      }
    
    
}
