const Discord = require('discord.js')

module.exports = {
    aliases: [
        "help",
        "h"
    ],
    doc: {
        exampleArgs: "",
        description: "Displays this panel",
    },
    fun: (ctx) => {
        const commands = ctx.commands
        console.log("commands = %s", commands)
        
        const embed = new Discord.RichEmbed()
        .setTitle(`Command summary for ikan bot`)
        .setColor(0xFFFFFF)
        
        const names = {}
        for (let i in commands) {
            console.log("command = %o", commands[i])
            const name = commands[i].name
            if (!names[name]) {
                console.log("commands[i].doc.description = %s", commands[i].doc.description)
                const description = commands[i].doc.description
                const exampleArgs = commands[i].doc.exampleArgs
                const aliases = commands[i].aliases.join("|")
                if (!!description) {
                    embed.addField(description, "`" + ctx.prefix + aliases + " " + exampleArgs + "`", false)
                }
                names[name] = name
            }
        }
        
        ctx.msg.channel.send(embed)
    }
}