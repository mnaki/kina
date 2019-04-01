#!/usr/local/bin/node

const Discord = require('discord.js')
const tcom = require('thesaurus-com')
const sscanf = require('sscanf')
const ud = require('urban-dictionary')
const mwDict = require('mw-dict')
const search = require('youtube-search')
const client = new Discord.Client()

const env = process.env
const isProd = (env.NODE_ENV === "PRODUCTION" || env.ENV === "PRODUCTION")

discordLog = (txt) => client.channels.get(env.DEV_CHANNEL).send('```' + txt + '```')
linkify = text => text.match(/\bhttps?:\/\/\S+/gi)

const delay = (t) => (f) => { setTimeout(f, t) }

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    // discordLog(`Logged in as ${client.user.tag}!`)
})

const PRUNE_STEP_TIME = 100

const isMentioned = (msg, client) => msg.mentions.users.find(u => u.discriminator == client.user.discriminator)

const limitText = (text, limit) => (text || "").split("").splice(0, limit).join("")


const prefix = ".."

const commands = {
    
    ping: {
        doc: {
            description: "ping",
            example: "Ping pong",
        },
        fun: (ctx) => {
            ctx.msg.reply("pong")
        }
    },
    
    help: {
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
                embed.addField(example, description, false)
            }
            
            ctx.msg.channel.send(embed)
        }
    },
    
    yt: {
        doc: {
            description: "yt [word]",
            example: "Youtube Search",
        },
        fun: (ctx) => {
            
            const opts = {
                maxResults: 1,
                key: env.YOUTUBE_API_KEY
            }
            
            console.log("ctx.args", ctx.args)
            const query = ctx.args.slice(1).join(" ")
            
            console.log("query = %s", query)
            
            search(query, opts, (err, results) => {
                if (err)
                return console.log(err)
                
                console.log(results)
                const result = results[0]
                
                const embed = new Discord.RichEmbed()
                .setTitle(result.title)
                .setThumbnail(result.thumbnails.medium.url)
                .setDescription(result.description)
                .setURL(result.link)
                .setColor(0xEE0000)
                
                ctx.msg.channel.send(embed)
                
            })
            
        }
    },
    
    mw: {
        doc: {
            description: "mw [word]",
            example: "Merriam-Webster",
        },
        fun: (ctx) => {
            const dict = new mwDict.CollegiateDictionary(env.MW_COLLEGIATE_API_KEY)
            // const dict = new mwDict.LearnersDictionary(env.MW_LEARNER_API_KEY)
            
            dict.lookup(ctx.args[1])
            .then(results => {
                results = results.slice(0, 1)
                for (result of results) {
                    console.log(result)
                    
                    const embed = new Discord.RichEmbed()
                    .setTitle(`Merriam-Webster's result for "${ctx.args[1]}"`)
                    .setColor(0xFFFFFF)
                    
                    embed.addField("Word", result.word || "N/A")
                    embed.addField("Functional label", result.functional_label || "N/A")
                    embed.addField("Etymology", result.etymology || "N/A")
                    embed.addField("Popularity", result.popularity || "N/A")
                    
                    result.definition.map((sense) => {
                        
                        if (sense.meanings && sense.meanings.length > 5) {
                            embed.addField("Meaning", sense.meanings)
                        }
                        
                        if (sense.synonyms && sense.synonyms.length > 0) {
                            embed.addField("Synonyms", sense.synonyms.join(', '))
                        }
                        
                        if (sense.antonyms && sense.antonyms.length > 0) {
                            embed.addField("Antonyms", sense.antonyms)
                        }
                        
                        if (sense.illustrations && sense.illustrations.length > 0) {
                            embed.addField("Illustrations", sense.illustrations)
                        }
                        
                    })
                    
                    ctx.msg.channel.send(embed)
                }
            })
            .catch(error => {
                discordLog(error)
                ctx.msg.reply(error)
                console.error(error)
            })
        }
    },
    
    syn: {
        doc: {
            description: "syn [word]",
            example: "Thesaurus.com synonym",
        },
        fun: (ctx) => {
            const results = tcom.search(ctx.args[1]).synonyms
            const embed = new Discord.RichEmbed()
            .setTitle(`Synonyms of **${ctx.args[1]}**`)
            .setColor(0xFFFFFF)
            .setDescription(results)
            
            ctx.msg.channel.send(embed)
        }
    },
    
    ant: {
        doc: {
            description: "ant [word]",
            example: "Thesaurus.com antonyms",
        },
        fun: (ctx) => {
            const results = tcom.search(ctx.args[1]).antonyms
            const embed = new Discord.RichEmbed()
            .setTitle(`Antonym of **${ctx.args[1]}**`)
            .setColor(0xFFFFFF)
            .setDescription(results)
            
            ctx.msg.channel.send(embed)
        }
    },
    
    ud: {
        doc: {
            description: "ud [word]",
            example: "Urban dictionary definition",
        },
        fun: (ctx) => {
            ud.term(ctx.args[1], (err, w) => {
                if (err)
                discordLog(err)
                
                console.log(w)
                
                const embed = new Discord.RichEmbed()
                .setTitle(`Urban Dictionnary result for **${ctx.args[1]}**`)
                .setColor(0xFFFFFF)
                .setDescription(w[0].definition)
                
                ctx.msg.channel.send(embed)
            })
        }
    },
    
    tineye: {
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
    },
    
    prune: {
        doc: {
            description: "prune [number] [user snowflake]",
            example: "Prune last X messages",
        },
        fun: (ctx) => {
            console.log("Pruning...")
            console.log("ctx.args = %s", ctx.args)
            const userSnowflake = ctx.args[2] && ctx.args[2].length > 3 && String(ctx.args[2])
            console.log("user = %s", userSnowflake)
            
            let limit = Number(ctx.args[1]) + 1
            if (limit > 100) {
                limit = 100
            }
            console.log(limit + " messages to prune")
            
            ctx.msg.channel.fetchMessages({ limit: limit })
            .then(messages => {
                let i = 0
                messages.filter((message) => {
                    if (!userSnowflake) {
                        return message
                    }
                    console.log("message.author = %s", message.author)
                    console.log("message.author.id == userSnowflake")
                    if (message.author.id == userSnowflake)
                    console.log("%d == %d", message.author.id, userSnowflake)
                    else
                    console.log("%d != %d", message.author.id, userSnowflake)
                    return message.author.id == userSnowflake
                })
                .map((message) => {
                    console.log("i = " + i)
                    const timeout = PRUNE_STEP_TIME * Number(i)
                    
                    delay(timeout)(() => {
                        console.log(`Deleting "${message.id} after ${timeout} sec"`)
                        message.delete()
                    })
                    
                    i = i + 1
                })
            })
            .catch(console.error)
        }
    },
    
    unknown: {
        doc: {
            description: "Placeholder",
        },
        fun: (ctx) => {
            msg.reply(`Unknown command ${ctx.args[0]}`)
        }
    },
    
}

const bot = async msg => {
    
    if (msg.author.discriminator == client.user.discriminator) {
        return
    }
    
    if (isMentioned(msg, client)) {
        msg.reply("WOOF WOOF")
        return
    }
    
    const args = sscanf(msg.content, prefix + '%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s')
    console.log("args %s", args)
    
    urls = linkify(msg.content)
    
    const ctx = {
        args,
        msg,
        urls
    }
    
    if (msg.content.startsWith(prefix)) {
        console.log("args[0] = %s", args[0])
        console.log("commands[args[0]] = %s", commands[args[0]])
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
    client.on('message', bot)
} catch (exc) {
    console.error(exc)
}

const micro = require('micro')
const sleep = require('then-sleep')

const server = micro(async (req, res) => {
    await sleep(500)
    return 'Hello world'
})

const port = Number(env.PORT)
const http = require("http")

server.listen(port)

setInterval(function() {
    if (isProd) {
        http.get(`https://nki-ikn.herokuapp.com:${port}`)
    } else {
        http.get(`http://localhost:${port}`)
    }
}, 1000 * 60 * 5)