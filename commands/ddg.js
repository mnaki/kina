const Discord = require('discord.js')
const DuckDuckScrape = require("duck-duck-scrape")
const ddg = new DuckDuckScrape()
const escape = require('markdown-escape')

function escapeMarkdown(text) {
    if (!text) {
        text = ""
    }
    const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1') // unescape any "backslashed" character
    const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1') // escape *, _, `, ~, \
    return escaped
}

module.exports = {
    aliases: [
        "ddg"
    ],
    doc: {
        exampleArgs: "words",
        description: "DuckDuckGo text search",
    },
    fun: async (ctx) => {

        const query = ctx.query
        const embed = new Discord.RichEmbed().setFooter(`DuckDuckGo results for ${query} ...`).setColor(0xFFFFFF)
        const msg = await ctx.msg.channel.send(embed)

        try {
            
            embed.setColor(0xFFFF00)
            msg.edit(embed)

            const results = await ddg.search(query, -2)
            
            const final = results.slice(0, 3).map(r => {
                const title = escapeMarkdown(r.title.slice(0, 100))
                const description = escapeMarkdown(r.description.slice(0, 100))
                return `\n` + `**─ [${title}](${r.url})**\n${description}...`
            }).join(`\n`)

            embed.setFooter(`DuckDuckGo results for ${escapeMarkdown(query)}`)
                .setDescription(final)
                .setColor(0x00FF00)
            
            msg.edit(embed)

        } catch (error) {
            embed.setFooter(`DuckDuckGo error`)
                .setColor(0xFF0000)
            msg.edit(embed)
            ctx.log(error)
        }
    }
}