const delay = (t) => (f) => { setTimeout(f, t) }
const PRUNE_STEP_TIME = 50

module.exports = {
    doc: {
        description: "prune number user snowflake",
        example: "Prune last X messages",
    },
    fun: (ctx) => {
        const userSnowflake = ctx.args[2] && ctx.args[2].length > 3 && String(ctx.args[2])
        
        let limit = Number(ctx.args[1]) + 1
        if (limit > 100) {
            limit = 100
        }
        
        ctx.msg.channel.fetchMessages({ limit: limit })
        .then(messages => {
            let i = 0
            messages.filter((message) => {
                if (!userSnowflake) {
                    return message
                }
                return message.author.id == userSnowflake
            })
            .map((message) => {
                const timeout = PRUNE_STEP_TIME * Number(i)
                delay(timeout)(() => message.delete())
                i = i + 1
            })
        })
        .catch(console.error)
    }
}