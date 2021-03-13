
module.exports = {
    
    name: "ping", 
    category: "info",  
    cooldown: 2, 
    usage: "ping", 
    description: "Zawiera informacje o tym, jak szybko bot może Ci odpowiedzieć", 

    run: async (client, message, args, user, text, prefix) => {
        
        const msg = await message.channel.send(`🏓 Pinging....`); 
        
        msg.edit(`🏓 Pong!
        Ping: ${Math.round(client.ws.ping)}ms`);
    }
}
