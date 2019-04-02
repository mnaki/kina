const assert = require('assert')

const handle = require("./server")

describe('Server', function () {
    afterEach(function () {
        handle.server.close()
    })

    it('should start server', function (done) {
        handle.start({
            domain: process.env.NOW_URL || process.env.DOMAIN,
            port: process.env.PORT
        }, (err, server) => {
            assert.ok(!err)
            done()
        })
    })

    it('should ping server', function (done) {
        handle.start({
            domain: process.env.NOW_URL || process.env.DOMAIN,
            port: process.env.PORT
        }, (err, server) => {
            server.ping((err, data) => {
                console.err(err)
                assert.ok(!err)
                done()
            })
        })
    })

    it('should read server', function (done) {
        handle.start({
            domain: process.env.NOW_URL || process.env.DOMAIN,
            port: process.env.PORT
        }, (err, server) => {
            server.ping((err, data) => {
                assert.equal(data, 'Hello world')
                done()
            })
        })
    })
})
