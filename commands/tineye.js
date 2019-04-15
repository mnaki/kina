module.exports = {
    doc: {
        description: "",
        example: "Placeholder"
    },
    fun: (ctx) => {
        ctx.msg.channel.fetchMessages({ limit: 3 })
        .then(messages => {
            const urls = []
            const contents = messages.map(m => m.content)
            for (content of contents) {
                const link = linkify(content)
                if (!!link) {
                    urls.push(link)
                }
            }
            const url = urls.flat().reverse()[0]
            ctx.msg.reply(`url = ${url}`)
        })
    }
}