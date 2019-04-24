const Discord = require('discord.js')
const DuckDuckScrape = require("duck-duck-scrape")
const ddg = new DuckDuckScrape()
const escape = require('markdown-escape')

function escapeMarkdown(text) {
    const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1') // unescape any "backslashed" character
    const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1') // escape *, _, `, ~, \
    return escaped
}

module.exports = {
    doc: {
        example: "ddg words",
        description: "DuckDuckGo text search",
    },
    fun: async (ctx) => {
        try {
                        
            const query = ctx.args.slice(1).join(" ")
            const embed = new Discord.RichEmbed().setTitle(`Searching Meriem Webster result for **${query}**...`)
            const msg = await ctx.msg.channel.send(embed)
            
            const results = await ddg.search(query + "\n\n", -2, "en")
            
            const final = results.slice(0, 3).map(r => {
                const title = escapeMarkdown(r.title.slice(0, 80))
                const description = escapeMarkdown(r.description.slice(0, 80))
                return `**\`${title}\`**\n\n${r.url}\n\n\`${description}\``
            }).join(`\n\n-----------------------------------\n\n`)

            embed.setTitle(`DuckDuckGo results for ${query}`)
                .setDescription(final)
                .setColor(0xFFFFFF)
            
            msg.edit(embed)

        } catch (error) {
            console.log(error)
        }
    }
}