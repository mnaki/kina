const tcom = require('thesaurus-com')

module.exports = {
    doc: {
        example: "ant word",
        description: "Thesaurus.com antonyms",
    },
    fun: (ctx) => {
        const results = tcom.search(ctx.args[1]).antonyms
        const embed = new Discord.RichEmbed()
        .setTitle(`Antonym of **${ctx.args[1]}**`)
        .setColor(0xFFFFFF)
        .setDescription(results)
        
        ctx.msg.channel.send(embed)
    }
}