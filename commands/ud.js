const ud = require('urban-dictionary')

module.exports = {
    doc: {
        description: "ud word",
        example: "Urban dictionary definition",
    },
    fun: (ctx) => {
        ud.term(ctx.args[1], (err, w) => {
            if (err)
            discordLog(err)
            
            const embed = new Discord.RichEmbed()
            .setTitle(`Urban Dictionnary result for **${ctx.args[1]}**`)
            .setColor(0xFFFFFF)
            .setDescription(w[0].definition)
            
            ctx.msg.channel.send(embed)
        })
    }
}