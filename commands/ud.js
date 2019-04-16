const ud = require('urban-dictionary')
const Discord = require('discord.js')

module.exports = {
    doc: {
        example: "ud word",
        description: "Urban dictionary definition",
    },
    fun: async (ctx) => {
        
        const embed = new Discord.RichEmbed().setTitle(`Searching Urban Dictionnary result for **${ctx.args[1]}**...`)
        const msg = await ctx.msg.channel.send(embed)

        ud.term(ctx.args[1], async (err, w) => {
            if (err) {
                discordLog(err)
            }
            
            const embed = new Discord.RichEmbed()
            .setTitle(`**${ctx.args[1]}**`)
            .setColor(0xFFFFFF)
            .setDescription(w[0].definition)
            
            msg.edit(embed)
        })
    }
}