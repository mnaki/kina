const tcom = require('thesaurus-com')

module.exports = {
    doc: {
        example: "syn word",
        description: "Thesaurus.com synonym",
    },
    fun: (ctx) => {
        const results = tcom.search(ctx.args[1]).synonyms
        const embed = new Discord.RichEmbed()
        .setTitle(`Synonyms of **${ctx.args[1]}**`)
        .setColor(0xFFFFFF)
        .setDescription(results)
        
        ctx.msg.channel.send(embed)
    }
}