// const Discord = require('discord.js')
const Haikufy = require('haikufy');

const haikufy = new Haikufy();




module.exports = {
    doc: {
        example: "haiku words",
        description: "Haiku extractor",
    },
    fun: async (ctx) => {
        try {
            const query = ctx.args.slice(1).join(" ")
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