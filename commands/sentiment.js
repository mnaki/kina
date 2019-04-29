const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const Discord = require('discord.js')
//const {format} = require('util')

module.exports = {
    aliases: [
        "sentiment",
        "sent",
        "s"
    ],
    doc: {
        exampleArgs: "count userID*",
        description: "Sentiment analysis",
    },
    fun: async (ctx) => {
        const userSnowflake = ctx.args[2] && ctx.args[2].length > 3 && String(ctx.args[2])
        
        let limit = Number(ctx.args[1]) + 1
        if (limit > 100) {
            limit = 100
        }

        const embed = new Discord.RichEmbed().setFooter(`Sentiment analysis`).setColor(0xFFFFFF)

        const msg = await ctx.msg.channel.send(embed)

        console.log("ooooo")

        embed.setFooter(`Sentiment analysis...`)
        .setColor(0xFFFF00)
        
        setTimeout(() => {
            msg.edit(embed)
        }, 200)
        

        ctx.msg.channel.fetchMessages({ limit: limit })
        .then(async messages => {
            const joined = messages.filter(async (message) => {
                if (!userSnowflake) {
                    return message
                }
                return message.author.id == userSnowflake
            })
            .map(m => m.content)
            .join(". ")

            const result = sentiment.analyze(joined);

            ctx.log(result)

            const pos = ( 100 * result.comparative) + 50
            const neg = (-100 * result.comparative) + 50
            
            const graphUrl = `https://image-charts.com/chart?&cht=bhs&chd=t:${neg}|${pos}&chs=200x50&chco=FF0000,0000FF`
            
            //ctx.msg.edit(graphUrl)

            console.log("okok")

            embed.setFooter(`Sentiment analysis: ok`)
            .setDescription(`Positive: ${pos}\nNegative: ${neg}`)
            .setImage(graphUrl)
            .setColor(0x00FF00)

            console.log("xxxx")


            setTimeout(() => {
                msg.edit(embed)
            }, 500)
            
        })
        .catch(console.error)
    }
}