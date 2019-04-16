const Discord = require('discord.js')

module.exports = {
    doc: {
        example: "help",
        description: "Displays this panel",
    },
    fun: (ctx) => {
        const commands = ctx.commands
        console.log("commands = %s", commands)
        
        const embed = new Discord.RichEmbed()
        .setTitle(`Command summary for ikan bot`)
        .setColor(0xFFFFFF)
        
        for (let i in commands) {
            console.log("commands[i].doc.description = %s", commands[i].doc.description)
            const description = commands[i].doc.description
            const example = commands[i].doc.example
            if (!!description && !!example) {
                embed.addField(description, ctx.prefix + example, false)
            }
        }
        
        ctx.msg.channel.send(embed)
    }
}