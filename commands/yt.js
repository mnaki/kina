const Discord = require('discord.js')
const ytSearch = require('youtube-search')

module.exports = {
    aliases: [
        "yt",
        "youtube"
    ],
    doc: {
        example: "query",
        description: "Youtube Search",
    },
    fun: async (ctx) => {
        try {
        
            const opts = {
                maxResults: 1,
                key: ctx.env.YOUTUBE_API_KEY
            }

            
            const query = ctx.query
            ctx.msg.edit(query + "...")

            ytSearch(query, opts, async (err, results) => {
                if (err)
                    return console.error(err)
                
                if (results.length > 0) {
                    const result = results[0]
                    ctx.msg.edit(result.link)
                } else {
                    //ctx.msg.delete()
                }
            })
            
        } catch (e) {
            ctx.log(e)
        }
    }
}