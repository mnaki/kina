const path = require("path")

module.exports = function () {
    
    try {
        
        this.commands = {}
        this.load = async (name) => {
            try {
                const command = require(path.join(__dirname, "commands", name))

                if (!command)
                    throw "Error while loading command " + name
                
                if (!command.aliases || command.aliases.length < 1)
                    throw `File ${command.name} doesn't contain aliases`
                
                for (alias of command.aliases) {
                    this.commands[alias] = command
                    this.commands[alias].name = name
                }
                return true
            }
            catch (e) {
                console.error(e)
            }
        }
        
        
    } catch (e) {
        console.error(e)
    }
    
    
}