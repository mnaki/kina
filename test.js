const assert = require('assert')

const server = require("./server")

describe('Server', function () {
    it('should ping server', function (done) {
        server({
            domain: process.env.DOMAIN,
            port: process.env.PORT
        }, (err, server) => {
            assert.ok(!err)
            server.ping((err, data) => {
                assert.ok(!err)
                assert.equal(data, 'Hello world')
                done()
            })
        })
    })
})
