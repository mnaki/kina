const mwDict = require('mw-dict')
const Discord = require('discord.js')

module.exports = {
    aliases: [
        "mw"
    ],
    doc: {
        exampleArgs: "word",
        description: "Merriam-Webster",
    },
    fun: async (ctx) => {
        const dict = new mwDict.CollegiateDictionary(ctx.env.MW_COLLEGIATE_API_KEY)
        // const dict = new mwDict.LearnersDictionary(ctx.env.MW_LEARNER_API_KEY)

        const query = ctx.args.slice(1).join(" ")
        const embed = new Discord.RichEmbed().setTitle(`Searching Meriem Webster result for **${query}**...`)
        const msg = await ctx.msg.channel.send(embed)
        
        dict.lookup(query)
        .then(results => {
            results = results.slice(0, 1)
            for (result of results) {
                
                const embed = new Discord.RichEmbed()
                .setTitle(`Merriam-Webster's result for "${query}"`)
                .setColor(0xFFFFFF)
                
                embed.addField("Word", result.word || "N/A")
                embed.addField("Functional label", result.functional_label || "N/A")
                embed.addField("Etymology", result.etymology || "N/A")
                embed.addField("Popularity", result.popularity || "N/A")
                
                result.definition.map((sense) => {
                    
                    if (sense.meanings && sense.meanings.length > 5) {
                        embed.addField("Meaning", sense.meanings)
                    }
                    
                    if (sense.synonyms && sense.synonyms.length > 0) {
                        embed.addField("Synonyms", sense.synonyms.join(', '))
                    }
                    
                    if (sense.antonyms && sense.antonyms.length > 0) {
                        embed.addField("Antonyms", sense.antonyms)
                    }
                    
                    if (sense.illustrations && sense.illustrations.length > 0) {
                        embed.addField("Illustrations", sense.illustrations)
                    }
                    
                })
                
                msg.edit(embed)
            }
        })
    }
}