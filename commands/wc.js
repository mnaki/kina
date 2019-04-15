const Discord = require('discord.js')
const worder = require("worder")
const blockspring = require('blockspring')
const svg_to_png = require('svg-to-png')
const path = require('path')


const wordcloud = async (text) => {
    return new Promise(async (resolve, reject) => {
        blockspring.runParsed("98203ea3afcaccbd3daf7b68e2183957", { "text": text, "width": 500, "height": 400, "rotate_flag": true, "min_freq": 0 }, { api_key: "br_108841_c340f1865696044fec6bfc698e1935bce126cbc5"}, async function (res) {
            const inputFilePath = res.params.image
            await svg_to_png.convert(inputFilePath, "output")
            const outputFilePath = path.join(__dirname, "..", "output", path.basename(inputFilePath)).replace(/\.[^\.]+$/, '.png');
            return resolve(outputFilePath)
        })
    })
}

module.exports = {
    doc: {
        description: "Wordcloud (WIP)",
        example: "wc number"
    },
    fun: (ctx) => {
        const count = ctx.args[2]
        ctx.msg.channel.fetchMessages({ limit: count })
        .then(messages => messages.map(m => m.content).map((content) => (worder(content))).flat().join(' '))
        .then(async (text) => {

            const embed = new Discord.RichEmbed()
            .setTitle(`>Loading Word cloud`)
            .setColor(0xFF0000)
            
            return [text, await ctx.msg.channel.send(embed)]
        })
        .then(async ([text, message]) => {
            return [await wordcloud(text), await message]
        })
        .then(async ([filename, message]) => {
            
            const embed = new Discord.RichEmbed()
            .setTitle(`Word cloud`)
            .setColor(0xFFFFFF)
            .attachFile(filename)
            
            await message.delete()
            return ctx.msg.channel.send(embed)
        })
    }
}