module.exports = {
    doc: {
        description: "help",
        example: "Displays this panel",
    },
    fun: (ctx) => {
        const embed = new Discord.RichEmbed()
        .setTitle(`Command summary for ikan bot`)
        .setColor(0xFFFFFF)
        
        for (let i in commands) {
            const description = commands[i].doc.description
            const example = commands[i].doc.example
            if (!!description && description.length > 3 && !!example && example.length > 3)
            embed.addField(description, prefix + example, false)
        }
        
        ctx.msg.channel.send(embed)
    }
}