const ytSearch = require('youtube-search')

module.exports = {
    doc: {
        example: "yt word",
        description: "Youtube Search",
    },
    fun: async (ctx) => {
        
        const opts = {
            maxResults: 1,
            key: ctx.env.YOUTUBE_API_KEY
        }

        
        const query = ctx.args.slice(1).join(" ")
        const msg = await ctx.msg.channel.send("Searching `" + query + "`")
        
        ytSearch(query, opts, async (err, results) => {
            if (err)
            return console.error(err)
            
            const result = results[0]

            if (result) {
                /*
                const embed = new Discord.RichEmbed()
                .setTitle(he.decode(result.title))
                .setThumbnail(result.thumbnails.medium.url)
                .setDescription(he.decode(result.description))
                .setURL(result.link)
                .setColor(0xEE0000)
                */

                msg.edit(result.link)
            } else {
                msg.edit("No result found for `" + query + "`")
            }
            
        })
        
    }
}