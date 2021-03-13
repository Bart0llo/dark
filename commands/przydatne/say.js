
module.exports = {
    name: "say", 
    category: "przydatne", 
    aliases: ["say", "powiedz", "napisz"], 
    cooldown: 2, 
    usage: "say <Tektst>", 
    description: "Bot wysyła twoją wiadomość", 

 
    run: async (client, message, args, user, text, prefix) => {	
        message.delete();
        message.channel.send(text) 
    }
}