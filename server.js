const micro = require('micro')
const sleep = require('then-sleep')
const http = require("http")

const server = micro(async (req, res) => {
    await sleep(500)
    return 'Hello world'
})

ping = (domain, port, cb) => {
    http.get({
        host: domain,
        port: port,
        path: '/'
    }, (response) => {
        let body = ''
        response.on('data', d => body += d)
        response.on('end', () => cb(null, body))
        response.on('error', (err) => cb(err, body))
    }).on('error', (err) => {
        cb(err)
    })
}

module.exports = {
    server: server,
    start: function ({ domain, port }, cb) {
        const err = null

        server.listen(port, '0.0.0.0')
        server.ping = (cb2) => ping(domain, port, cb2)

        cb(err, server)
    }
}