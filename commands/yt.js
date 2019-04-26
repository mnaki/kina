const Discord = require('discord.js')
const ytSearch = require('youtube-search')

module.exports = {
    aliases: [
        "yt",
        "youtube"
    ],
    doc: {
        example: "yt query",
        description: "Youtube Search",
    },
    fun: async (ctx) => {
        try {
        
            const opts = {
                maxResults: 4,
                key: ctx.env.YOUTUBE_API_KEY
            }

            
            const query = ctx.args.slice(1).join(" ")
            
            const embed = new Discord.RichEmbed()
                .setTitle("Searching `" + query + "`")
                .setColor(0xFF0000)

            const msg = await ctx.msg.channel.send(embed)

            ytSearch(query, opts, async (err, results) => {

                if (err)
                    return console.error(err)

                const description = results.slice(0, opts.maxResults - 1).map(result => (`[${result.title}](${result.link})`)).join('\n\n')

                console.log("description = %o", description)
                
                if (results.length > 0) {
                    embed.setTitle("Search results for " + query)
                    embed.setDescription(description)
                    msg.edit(embed)
                } else {
                    msg.delete()
                }
                
            })
            
        } catch (e) {
            ctx.log(e)
        }
    }
}