//here the event starts
module.exports = client => {
    console.log(`Bot ${client.user.tag} jest aktywny!`); 
    const activities = [
        { name: 'd.nakładka | Dzięki nakładce wspierasz nasz serwer', type: 'WATCHING' }, 
        { name: 'd.pomoc', type: 'WATCHING' }
      ];
    
      // Update presence
      client.user.setPresence({ status: 'online', activity: activities[0] });
    
      let activity = 1;
    
      // Update activity every 30 seconds
      setInterval(() => {
        activities[2] = { name: `Huh jaki to świat jest piękny`, type: 'WATCHING' }; // Update server count
        activities[3] = { name: `${client.users.cache.size} osób`, type: 'WATCHING' }; // Update user count
        if (activity > 3) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
      }, 30000); // "PLAYING", "WATCHING", "LISTENING", "STREAMING" (dodać link: "https://twitch.tv/#")
}