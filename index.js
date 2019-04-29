#!/usr/local/bin/node

const throttle = require('lodash/throttle')
const Discord = require('discord.js')
const sscanf = require('sscanf')
const client = new Discord.Client()
const CommandManager = require('./command-manager')
const prefix = "'"
const env = process.env
const isMentioned = (msg, client) => msg.mentions.users.find(u => u.discriminator == client.user.discriminator)
const limitText = (text, limit) => (text || "").split("").splice(0, limit).join("")

function strip(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

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
    //commandManager.load("unknown")
    commandManager.load("wc")
    commandManager.load("yt")
    commandManager.load("i")
    commandManager.load("haiku")
    commandManager.load("rl")
    commandManager.load("yts")
    commandManager.load("sentiment")
} catch (e) {
    console.error(e)
}

const util = require('util')
discordLog = (txt) => {
    const fmt = util.format("%o", txt)
    console.log(fmt)
    return client.channels.get(env.DEV_CHANNEL).send('```' + fmt + '```')
}
linkify = text => text.match(/\bhttps?:\/\/\S+/gi)

client.on('ready', () => {
    discordLog(`Logged in as ${client.user.tag}!`)
})

const botEvent = async msg => {
    try {
        if (msg.author.id != env.SNOWFLAKE) {
            return
        }

        urls = linkify(msg.content)
            
        const args = sscanf(msg.content, prefix + '%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s')
        const commands = commandManager.commands
        const query = strip(args.slice(1).join(" "))
        
        const ctx = { args, msg, urls, env, prefix, commands, query, log: discordLog }
        
        if (msg.content.startsWith(prefix)) {
            const fun = commands[args[0]].fun || commands["unknown"].fun
            try {
                fun(ctx)
            } catch (error) {
                console.error(error)
                discordLog(exc)
            }
        }
    } catch(e) {
        discordLog(e)
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