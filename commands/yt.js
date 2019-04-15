const ytSearch = require('youtube-search')

module.exports = {
    doc: {
        description: "yt word",
        example: "Youtube Search",
    },
    fun: (ctx) => {
        
        const opts = {
            maxResults: 1,
            key: ctx.env.YOUTUBE_API_KEY
        }
        
        const query = ctx.args.slice(1).join(" ")
        
        ytSearch(query, opts, (err, results) => {
            if (err)
            return console.error(err)
            
            const result = results[0]
            
            /*
            const embed = new Discord.RichEmbed()
            .setTitle(he.decode(result.title))
            .setThumbnail(result.thumbnails.medium.url)
            .setDescription(he.decode(result.description))
            .setURL(result.link)
            .setColor(0xEE0000)
            */

            ctx.msg.channel.send(result.link)
            
        })
        
    }
}