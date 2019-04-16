module.exports = {
    doc: {
        example: "ping",
        description: "Ping pong",
    },
    fun: (ctx) => {
        ctx.msg.reply("pong")
    }
}