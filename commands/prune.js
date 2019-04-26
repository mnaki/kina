module.exports = {
    aliases: [
        "prune",
        "clean"
    ],
    doc: {
        exampleArgs: "count userID*",
        description: "Prune last X messages",
    },
    fun: async (ctx) => {
        const userSnowflake = ctx.args[2] && ctx.args[2].length > 3 && String(ctx.args[2])
        
        let limit = Number(ctx.args[1]) + 1
        if (limit > 100) {
            limit = 100
        }

        ctx.msg.channel.fetchMessages({ limit: limit })
        .then(async messages => {
            messages.filter(async (message) => {
                if (!userSnowflake) {
                    return message
                }
                return message.author.id == userSnowflake
            })
            .map(async (message) => {
                message.delete()
            })
        })
        .catch(console.error)
    }
}