#!/usr/local/bin/node

const throttle = require('lodash/throttle')
const Discord = require('discord.js')
const sscanf = require('sscanf')
const client = new Discord.Client()
const CommandManager = require('./command-manager')
const prefix = ">"
const env = process.env
const isMentioned = (msg, client) => msg.mentions.users.find(u => u.discriminator == client.user.discriminator)
const limitText = (text, limit) => (text || "").split("").splice(0, limit).join("")

const commandManager = new CommandManager()
try {
    commandManager.load("emoji")
    commandManager.load("ddg")
    commandManager.load("help")
    commandManager.load("mw")
    commandManager.load("ping")
    commandManager.load("prune")
    commandManager.load("tineye")
    commandManager.load("ud")
    commandManager.load("unknown")
    commandManager.load("wc")
    commandManager.load("yt")
    commandManager.load("i")
    commandManager.load("haiku")
    commandManager.load("rl")
} catch (e) {
    console.error(e)
}

discordLog = (txt) => client.channels.get(env.DEV_CHANNEL).send('```' + txt + '```')
linkify = text => text.match(/\bhttps?:\/\/\S+/gi)

client.on('ready', () => {
    discordLog(`Logged in as ${client.user.tag}!`)
})

const botEvent = async msg => {

    if (msg.author.id != env.SNOWFLAKE) {
        return
    }
        
    const args = sscanf(msg.content, prefix + '%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s')
    
    urls = linkify(msg.content)

    const commands = commandManager.commands
    
    const ctx = { args, msg, urls, env, prefix, commands, log: discordLog }
    
    if (msg.content.startsWith(prefix)) {
        const fun = commands[args[0]].fun || commands["unknown"].fun
        try {
            fun(ctx)
        } catch (error) {
            console.error(error)
            discordLog(exc)
        }
    }
    
}

try {
    client.login(env.LOGIN_TOKEN)
    client.on('message', throttle(botEvent, 100, { leading: true, trailing: true }))
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