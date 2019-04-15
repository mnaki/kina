module.exports = {
    doc: {
        description: "ping",
        example: "Ping pong",
    },
    fun: (ctx) => {
        ctx.msg.reply("pong")
    }
}