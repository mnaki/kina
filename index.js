#!/usr/local/bin/node

const Discord = require('discord.js')
const sscanf = require('sscanf')
const client = new Discord.Client()
const CommandManager = require('./command-manager')
const prefix = "!"
const env = process.env
const isMentioned = (msg, client) => msg.mentions.users.find(u => u.discriminator == client.user.discriminator)
const limitText = (text, limit) => (text || "").split("").splice(0, limit).join("")

const commandManager = new CommandManager()

commandManager.load("ping")
commandManager.load("help")
commandManager.load("yt")
commandManager.load("mw")
commandManager.load("syn")
commandManager.load("ant")
commandManager.load("ud")
commandManager.load("tineye")
commandManager.load("wc")
commandManager.load("prune")
commandManager.load("unknown")

discordLog = (txt) => client.channels.get(env.DEV_CHANNEL).send('```' + txt + '```')
linkify = text => text.match(/\bhttps?:\/\/\S+/gi)

client.on('ready', () => {
    discordLog(`Logged in as ${client.user.tag}!`)
})

const botEvent = async msg => {
    
    if (msg.author.discriminator == client.user.discriminator) {
        return
    }
    
    if (isMentioned(msg, client)) {
        msg.reply("WOOF WOOF")
        return
    }
    
    const args = sscanf(msg.content, prefix + '%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s')
    
    urls = linkify(msg.content)
    
    const ctx = {
        args,
        msg,
        urls,
        env
    }
    
    if (msg.content.startsWith(prefix)) {
        const commands = commandManager.commands
        const fun = commands[args[0]].fun || commands["unknown"].fun
        try {
            fun(ctx)
        } catch (error) {
            discordLog(exc)
            console.error(error)
        }
    }
    
}

try {
    client.login(env.LOGIN_TOKEN)
    client.on('message', botEvent)
} catch (exc) {
    console.error(exc)
}

// Server

const micro = require('micro')

micro(async (req, res) => {
    return 'Hello world'
})

// Misc

process.on('uncaughtException', (err) => {
    console.error(err)
}) 