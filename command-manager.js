const path = require("path")

module.exports = function () {
    this.commands = {}
    this.load = (name) => {
        //TODO error management
        const command = require(path.join(__dirname, "commands", name))
        if (!command) {
            throw "Error while loading command"
        }
        this.commands[name] = command
        return true
    }
}