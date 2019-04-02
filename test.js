const assert = require('assert')

const handle = require("./server")

describe('Server', function () {
    afterEach(function () {
        handle.server.close()
    })

    it('should ping server', function (done) {
        handle.start({
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
