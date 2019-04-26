const mwDict = require('mw-dict')
const Discord = require('discord.js')

function strip(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

module.exports = {
    aliases: [
        "mw"
    ],
    doc: {
        exampleArgs: "word",
        description: "Merriam-Webster",
    },
    fun: async (ctx) => {
        try {
            
            const dict = new mwDict.CollegiateDictionary(ctx.env.MW_COLLEGIATE_API_KEY)
            // const dict = new mwDict.LearnersDictionary(ctx.env.MW_LEARNER_API_KEY)
            
            const query = strip(ctx.args[1])
            const embed = new Discord.RichEmbed().setTitle(`Searching Meriem Webster result for **${query}**...`)
            const msg = await ctx.msg.channel.send(embed)
            
            const results = await dict.lookup(query)

            
            results.slice(0, 1).map(async (result) => {
                
                const embed = new Discord.RichEmbed()
                .setTitle(`Merriam-Webster's result for "${query}"`)
                .setColor(0xFFFFFF)
                
                embed.addField("Word", result.word || "N/A")
                embed.addField("Functional label", result.functional_label || "N/A")
                embed.addField("Etymology", result.etymology || "N/A")
                embed.addField("Popularity", result.popularity || "N/A")
                
                result.definition.map(async (sense) => {
                    try {
                        
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
                    } catch(e) {
                        ctx.log(e)
                    }
                    
                })
                
                msg.edit(embed)
            })
        } catch(e) {
            ctx.log(e)
        } finally {
            //ctx.msg.delete()
        }
    }
    
}