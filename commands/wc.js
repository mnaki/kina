const Discord = require('discord.js')
const worder = require("worder")
const blockspring = require('blockspring')
const svg_to_png = require('svg-to-png')
const path = require('path')


const wordcloud = async (text) => {
    return new Promise(async (resolve, reject) => {
        blockspring.runParsed("8fa1781a0afcde79db38040bd83b47c2", { "text": text, "width": 300, "height": 300, "rotate_flag": false, "min_freq": 0, fontName: "Verdana" }, { api_key: "br_108841_89c667c1e75185823b47ad316a84a1200d1ee0e9"}, async function (res) {
            const inputFilePath = res.params.image
            await svg_to_png.convert(inputFilePath, "output")
            const outputFilePath = path.join(__dirname, "..", "output", path.basename(inputFilePath)).replace(/\.[^\.]+$/, '.png')
            return resolve(outputFilePath)
        })
    })
}

module.exports = {
    aliases: [
        "wc",
        "wordcloud"
    ],
    doc: {
        description: "Wordcloud (WIP)",
        exampleArgs: "number"
    },
    fun: async (ctx) => {
        const count = ctx.args[2]

        const embed = new Discord.RichEmbed()
        .setTitle(`>Loading Word cloud`)
        .setColor(0xFF0000)

        const message = await ctx.msg.channel.send(embed)

        ctx.msg.channel.fetchMessages({ limit: count })
        .then(messages => messages.map(m => m.content).map((content) => (worder(content))).flat().join(' '))
        .then(wordcloud)
        .then(async (filename) => {
            //setTimeout(() => message.delete(), 250)
            //setTimeout(() => ctx.msg.delete(), 500)
            
            ctx.msg.channel.send("", { files: [
                filename
            ]})
        })
    }
}