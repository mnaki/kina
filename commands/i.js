const Quote = require('inspirational-quotes');
const Discord = require('discord.js')
 

module.exports = {
    aliases: [
        "i",
        "inspi",
        "inspiration",
        "inspirational"
    ],
    doc: {
        exampleArgs: "",
        description: "Get inspirational quotes",
    },
    fun: async (ctx) => {

        const embed = new Discord.RichEmbed().setTitle(`>Fetching inspirational quote ...`)
        const msg = await ctx.msg.channel.send(embed)
        
        setTimeout(() => {
            const quote = Quote.getQuote()
            embed.setTitle(`**${quote.text}**`)
                .setDescription(quote.author)
                .setColor(0xFFFFFF)
            msg.edit(embed)
        }, 500)
    }
}