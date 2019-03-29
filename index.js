#!/usr/local/bin/node

const Discord = require('discord.js')
const tcom = require('thesaurus-com')
const sscanf = require('sscanf')
const ud = require('urban-dictionary')
const mwDict = require('mw-dict')
const search = require('youtube-search')
const client = new Discord.Client()

const env = process.env

discordLog = (txt) => client.channels.get(env.DEV_CHANNEL).send('```' + txt + '```')

const delay = (t) => {
    return function (f) {
        setTimeout(f, t)
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    // discordLog(`Logged in as ${client.user.tag}!`)
})

const PRUNE_STEP_TIME = 250

const isMentioned = (msg, client) => msg.mentions.users.find(u => u.discriminator == client.user.discriminator)

const limitText = (text, limit) => (text || "").split("").splice(0, limit).join("")

const DOC = {
    "mw [word]": "Merriam-Webster",
    "syn [word]": "Thesaurus.com synonym",
    "ant [word]": "Thesaurus.com antonyms",
    "ud [word]": "Urban dictionary definition",
    "prune [number]": "Prune last X messages"
}

const prefix = ".."

const commands = {
    
    help: (ctx) => {
        const embed = new Discord.RichEmbed()
        .setTitle(`Command summary for ikan bot`)
        .setColor(0xFFFFFF)
        
        for (let i in DOC) {
            embed.addField(String(DOC[i]), prefix + String(i), false)
        }
        
        ctx.msg.channel.send(embed)
    },
    
    yt: (ctx) => {
        
        const opts = {
            maxResults: 1,
            key: env.YOUTUBE_API_KEY
        }
        
        search(ctx.arg, opts, (err, results) => {
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
        
    },
    
    mw: (ctx) => {
        const dict = new mwDict.CollegiateDictionary(env.MW_COLLEGIATE_API_KEY)
        // const dict = new mwDict.LearnersDictionary(env.MW_LEARNER_API_KEY)
        
        dict.lookup(ctx.arg)
        .then(results => {
            results = results.slice(0, 1)
            for (result of results) {
                console.log(result)
                
                const embed = new Discord.RichEmbed()
                .setTitle(`Merriam-Webster's result for "${ctx.arg}"`)
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
    },
    
    syn: (ctx) => {
        const results = tcom.search(ctx.arg).synonyms
        const embed = new Discord.RichEmbed()
        .setTitle(`Synonyms of **${ctx.arg}**`)
        .setColor(0xFFFFFF)
        .setDescription(results)
        
        ctx.msg.channel.send(embed)
    },
    
    ant: (ctx) => {
        const results = tcom.search(ctx.arg).antonyms
        const embed = new Discord.RichEmbed()
        .setTitle(`Antonym of **${ctx.arg}**`)
        .setColor(0xFFFFFF)
        .setDescription(results)
        
        ctx.msg.channel.send(embed)
    },
    
    ud: (ctx) => {
        ud.term(ctx.arg, (err, w) => {
            if (err)
            discordLog(err)
            
            console.log(w)
            
            const embed = new Discord.RichEmbed()
            .setTitle(`Urban Dictionnary result for **${ctx.arg}**`)
            .setColor(0xFFFFFF)
            .setDescription(w[0].definition)
            
            ctx.msg.channel.send(embed)
        })
    },
    
    prune: (ctx) => {
        let limit = Number(ctx.arg) + 1
        if (limit > 100) { limit = 100 }
        console.log(limit + " messages to prune")
        ctx.msg.channel.fetchMessages({ limit: limit })
        .then(messages => {
            let i = 0
            messages.map((message) => {
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
    },
    
    unknown: ({cmd, arg, msg}) => {
        msg.reply(`Unknown command ${cmd}`)
    }
    
}

const bot = async msg => {
    
    if (msg.author.discriminator == client.user.discriminator) {
        return
    }
    
    if (isMentioned(msg, client)) {
        msg.reply("WOOF WOOF")
        return
    }
    
    const [cmd, arg] = sscanf(msg.content, prefix + '%s %s')
    console.log("cmd = %s\narg = %s", cmd, arg)
    
    const context = {
        cmd,
        arg,
        msg
    }
    
    if (msg.content.startsWith(prefix)) {
        const fun = commands[cmd] || commands["unknown"]
        fun(context)
    }
    
}

try {
    client.on('message', bot)
} catch (exc) {
    console.error(exc)
    discordLog(exc)
}





client.login(env.LOGIN_TOKEN)