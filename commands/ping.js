module.exports = {
    aliases: [
        "ping",
        "p"
    ],
    doc: {
        exampleArgs: "",
        description: "Ping pong",
    },
    fun: (ctx) => {
        ctx.msg.reply("pong")
    }
}