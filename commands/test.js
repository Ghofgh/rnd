module.exports = {
    name : "test",
    description  : "Just for test",
    execute(message,args){
        console.log("object");
        const channel = message.member?.voice?.channel
        distube
        .play(message.member?.voice?.channel,"among us", {
            
            textChannel: message.channel,
            member: message.member.voice,
        })
        .catch(err => {
            console.log(err);
        })
    }
}