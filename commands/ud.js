const ud = require('urban-dictionary')
const Discord = require('discord.js')

module.exports = {
    aliases: [
        "ud"
    ],
    doc: {
        exampleArgs: "word",
        description: "Urban dictionary definition",
    },
    fun: async (ctx) => {
        
        const query = ctx.args.slice(1).join(" ")
        const embed = new Discord.RichEmbed().setTitle(`Searching Urban Dictionnary result for **${query}**...`)
        const msg = await ctx.msg.channel.send(embed)

        ud.term(query, async (err, w) => {
            if (err) {
                discordLog(err)
            }
            
            const embed = new Discord.RichEmbed()
            .setTitle(`**${query}**`)
            .setColor(0xFFFFFF)
            .setDescription(w[0].definition)
            
            msg.edit(embed)
        })
    }
}