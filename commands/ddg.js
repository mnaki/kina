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
    aliases: [
        "ddg"
    ],
    doc: {
        exampleArgs: "words",
        description: "DuckDuckGo text search",
    },
    fun: async (ctx) => {

        const query = ctx.args.slice(1).join(" ")
        const embed = new Discord.RichEmbed().setTitle(`DuckDuckGo results for ${query} ...`)
        const msg = await ctx.msg.channel.send(embed)

        try {
            
            const results = await ddg.search(query, -2)
            console.log("%o", results)
            
            const final = results.slice(0, 3).map(r => {
                const title = escapeMarkdown(r.title.slice(0, 100))
                const description = escapeMarkdown(r.description.slice(0, 100))
                return `\n` + `**─ [${title}](${r.url})**\n${description}...`
            }).join(`\n\n`)

            embed.setTitle(`**DuckDuckGo results for ${escapeMarkdown(query)}**`)
                .setDescription(final)
                .setColor(0xFFFFFF)
            
            msg.edit(embed)

        } catch (error) {
            embed.setTitle(`**DuckDuckGo error**`)
                .setColor(0xFF0000)
            msg.edit(embed)
            ctx.msg.delete()
            console.log(error)
        }
    }
}