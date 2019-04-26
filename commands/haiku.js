// const Discord = require('discord.js')
const Haikufy = require('haikufy');

const haikufy = new Haikufy();

module.exports = {
    aliases: [
        "hai",
        "haiku"
    ],
    doc: {
        exampleArgs: "words",
        description: "Haiku extractor",
    },
    fun: async (ctx) => {
        try {
            const query = ctx.query
            const text = haikufy.find(query);
            setTimeout(() => {
                console.log(text)
                ctx.msg.channel.send(text.join("\n"))
            }, 500)
        } catch (e) {
            discordLog(e)
        }
    }
}