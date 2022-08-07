const data = require("../data.json")

module.exports = {
    name : "ver",
    description  : "version of helper-bot",
    execute(message,args){
        message.channel.send(`${data.msg}Version of helper_bot : ${data.version}${data.msg}`)
    }
}