const micro = require('micro')
const http = require("http")

const server = micro(async (req, res) => {
    return 'Hello world'
})

const ping = (domain, port, cb) => {
    const url = process.env.NOW == "1" ? `http://${domain}:${port}`
    console.log(url)
    http.get(url, (response) => {
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

        server.listen(port)
        server.ping = (cb2) => ping(domain, port, cb2)

        cb(err, server)
    }
}