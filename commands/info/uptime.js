
module.exports = {
    
    name: "uptime", 
    category: "info", 
    cooldown: 10, 
    usage: "uptime", 
    description: "Zwraca czas, przez jaki bot jest online", 

    
    run: async (client, message, args, user, text, prefix) => {
          
        function duration(ms) { 
            const sec = Math.floor(ms / 1000 % 60).toString();
            const min = Math.floor(ms / (60*1000) % 60).toString();
            const hrs = Math.floor(ms / (60*60*1000) % 60).toString();
            const days = Math.floor(ms / (24*60*60*1000) % 60).toString();
            return `\`${days} Dni\`, \`${hrs} Godzin\`, \`${min} Minut\`, \`${sec} Sekund\``
        }
        message.reply(`:white_check_mark: **${client.user.username}** jest ${duration(client.uptime)} online`); 
    }
}