//here the event starts
module.exports = client => {
    console.log(`Bot ${client.user.tag} jest aktywny!`); 
    client.user.setActivity(`>nakładka | Wpomóż nasz serwer dzięki nakładce!`, { type: "WATCHING"}) // "PLAYING", "WATCHING", "LISTENING", "STREAMING" (dodać link: "https://twitch.tv/#")
}