const path = require("path")

module.exports = function () {
    try {
        this.commands = {}
        this.load = async (name) => {
            //TODO error management
            const command = require(path.join(__dirname, "commands", name))
            if (!command) {
                throw "Error while loading command"
            }
            this.commands[name] = command
            return true
        }
    } catch (e) {
        console.error(e)
        return false
    }
}