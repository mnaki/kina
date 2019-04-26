const rl = require('random-lyrics')
const Discord = require('discord.js')
const emojis = " :musical_note: :sound: :musical_keyboard:"
const worder = require("worder")
const sanitize = require("sanitize-html")
 

module.exports = {
    aliases: [
        "rl"
    ],
    doc: {
        exampleArgs: "",
        description: "Random lyrics",
    },
    fun: async (ctx) => {
        try {
            const embed = new Discord.RichEmbed().setTitle(`Fetching Random Lyrics ...`)
            setTimeout(async () => {
                const msg = await ctx.msg.channel.send(embed)
                rl().then((result) => {
                    console.log("%o", result)
                    const lyrics = worder(sanitize(result.lyrics, {allowedTags: []})).slice(0, 25).join(' ')
                    embed.setTitle(`***${lyrics}${emojis}***`)
                    msg.edit(embed)
                })
            }, 500)
        }
        catch (e) {
            console.log(e)
            discordLog(e)
        }
    }
}