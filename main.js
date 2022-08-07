

const discord = require("discord.js")

const fetch = require("node-fetch")
const client = new discord.Client({
    intents : ['Guilds', 'GuildVoiceStates', 'GuildMessages']
})
const { DisTube } = require('distube')
const { ApplicationCommandType, ApplicationCommandOptionType,InteractionType, ButtonStyle } = require('discord.js');

const distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
})





var Scraper = require('images-scraper');



const google = new Scraper({
    puppeteer: {
      headless: true,
      args: ["--no-sandbox"],
    },
  });








const data = require("./data.json")



const fs = require('fs')
const dotenv = require("dotenv");
const Snoowrap = require("snoowrap");


dotenv.config()

client.commands = new discord.Collection()

const commandFile = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}








client.on("ready",async() => {
    console.log("ready");
    client.user.setActivity(`Random things with ${client.guilds.cache.size} servers`)
    


    let commands
    
    commands = client.application?.commands
    
    commands?.create({
        name : "test",
        description : "any"
    })
    /*commands?.create({
        name : "bot",
        description : "Invite Minecraft bot",
        
    })*/

    commands?.create({
        name : "status",
        description : "Minecraft Server Status",
        options : [{
            name : "ip",
            description : "Minecraft Server IP",
            required : true,
            type : ApplicationCommandOptionType.String
        },
    {
        name : "bedrock",
        description : "is Minecraft server a Bedrock server ?",
        required : true,
        type : ApplicationCommandOptionType.Boolean,
    }]
    })
    
    
    
    /*commands?.create({
        name : "status_api",
        description : "Get API of Minecraft server",
        options : [
            {
                name : "ip",
                description : "Minecraft Server IP",
                required : true,
                type : ApplicationCommandOptionType.String
            }
        ]
    })*/
    
    commands?.create({
        name : "mc_players",
        description : "Get the players' names",
        options : [
            {
                name : "ip",
                description : "Minecraft Server IP",
                required : true,
                type : ApplicationCommandOptionType.String
            }
        ]
    })
    commands?.create({
        name : "msg",
        description : `Send a message using ${client.user.tag}`,
        options : [
            {
                name : "msg",
                description : "message",
                required : true,
                type : ApplicationCommandOptionType.String           
            }
        ]
    })
    commands?.create({
        name : "discord_server",
        description : "Discord server status",
        
    })
    commands?.create({
        name : "user",
        description : "User information",
        options : [
            {
                name : "user",
                description : "Member name",
                required : true,
                type : ApplicationCommandOptionType.Mentionable           
            }
        ]
    })
    /*commands?.create({
        name : "img",
        description : "Send photo by name",
        options : [
            {
                name : "image_name",
                description : "image name",
                required : true,
                type : ApplicationCommandOptionType.String
            },
            {
                name : "index",
                description : "index of image",
                required : false,
                type : ApplicationCommandOptionType.Number
            }
        ]
    })*/
    commands?.create({
        name : "meme",
        description : "Get meme"
    })
    commands?.create({
        name : "play",
        description : "play music",
        options : [
            {
                name : "name",
                description : "music name",
                required : true,
                type : ApplicationCommandOptionType.String
            }
        ]
    })
    commands?.create({
        name : "stop",
        description : "stop playing music",
        
    })
    commands?.create({
        name : "pause",
        description : "pause The music",
        
    })
    commands?.create({
        name : "resume",
        description : "resume The music",
        
    })
    commands?.create({
        name : "skip",
        description : "skip a music",
        
    })
    commands?.create({
        name : "volume",
        description : "Change music volume",
        options : [
            {
                name : "volume",
                description : "volume percentage",
                required : true,
                type : ApplicationCommandOptionType.Number
            }
        ]
    })
    commands?.create({
        name : "quiz",
        description : "play a quiz",
        options : [
            {
                name : "category",
                description : "select a Category",
                required : false,
                type : ApplicationCommandOptionType.Number
            }
        ]
    })
    commands?.create({
        name : "category",
        description : "get category number",
        
    })
    commands?.create({
        name : "salta3_memes",
        description : "get salta3_memes",
        
    })
    commands?.create({
        name : "help",
        description : "help",
        
    })
})


client.on("interactionCreate",async(interaction)=>{
    if(!interaction.type === InteractionType.ApplicationCommand) return;
    const {commandName , options} = interaction
    client.user.setActivity(`Random things with ${client.guilds.cache.size} servers`)

    if(commandName === "test"){
        interaction.reply({
            content : "Working"
        })
        
        
    }else if(commandName === "bot" ){
    
        /*interaction.reply({
            content : `Invite Minecraft Bot from This link 👇 : 
https://helper-bot-mc.herokuapp.com/invite_bot`,
ephemeral : true
        })*/
        interaction.reply({
            content : "This command is deleted !!",
            ephemeral : true
        })
        
    
    }else if(commandName === "status"){
        interaction.deferReply({
            ephemeral : true
        })
        let bedrock = options.getBoolean("bedrock")
        
        let ip = options.getString("ip")
        let link = ""
        if(bedrock == true){
link = `https://api.mcsrvstat.us/bedrock/2/${ip}`
        }else{
            link = `https://api.mcsrvstat.us/2/${ip}`
        }
        fetch(link).then(
            (result) =>{ 
                
            return result.json()
                }
            )
            .then(
                (result) =>{
                    console.log(result);
                    try{
                    const em = new discord.EmbedBuilder()
        .setTitle("Minecraft server status")
        
        .addFields([
            {
                name : "host",value:result.hostname
            },
            {
                name : "port", value : `${result.port}`
            },
            {
                name : "description",value : result.motd.clean[0]
            },
            
            {
                name : "players",value : result.players.online + " / " + result.players.max
            },
            {
                name : "version",value : result.version
            },
            
        ])
                    interaction.editReply({
                        embeds : [em],
                        
                        ephemeral : true
                    })
                }
                catch(err){
                    interaction.editReply({
                        content : ` Error : Unable to find server`,
                        ephemeral : true,
                    })
                }
                }
            )
            .catch(
                (err) =>{ interaction.editReply({
                    content : "err",
                    ephemeral : true
                })
            }
)
    }
    else if(commandName === "status_api"){
        let ip = options.getString("ip")
        
        
        
            

                const row = new discord.MessageActionRow()
                
                .setComponents(
                    new discord.MessageButton()
                    .setURL(`https://api.mcsrvstat.us/2/${ip}`)
                    .setLabel("View api")
                    .setStyle("LINK")
                )

                interaction.reply({
                    content : "API of Minecraft server",
                    components : [row],
                    ephemeral : true
                })


         
        
        
        
      
    }else if(commandName === "mc_players"){
        let ip = options.getString("ip")
        let players = ""
        
        fetch(`https://api.mcsrvstat.us/2/${ip}`)
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
                return result.players.list.forEach((ele)=>{
                    players += ` ${ele} |`
                })
            }
        )
        .then(
            (result)=>{
                interaction.reply({
                    content: `${players}`,
                    ephemeral : true
                })
            }
        )
        .catch(
            (err)=>{
                interaction.reply({
                    content : "Error: Unable to access players",
                    ephemeral : true
                })
            }
        )
        
        
    }else if(commandName === "msg"){
        let msg = options.getString("msg")
        await interaction.channel.send(`${msg}`)
        
        interaction.reply({
            content : "Message has been sent",
            ephemeral : true
        })
    }else if(commandName === "discord_server"){
        const embed = new discord.EmbedBuilder()
        
        .setAuthor({name : interaction.guild.name,iconURL : interaction.guild.iconURL({dynamic : true})})
        .setDescription(`Owner : <@${interaction.guild.ownerId}>
Members : ${interaction.guild.memberCount}
Created at : ${interaction.guild.createdAt.toLocaleString()}`)
.setThumbnail(interaction.guild.iconURL({dynamic : true}))
        interaction.reply({
            embeds : [embed],
            ephemeral : true,
        })
    }else if(commandName === "user"){
        
try{
        
        let member = options.getMentionable("user")
        const embed = new discord.EmbedBuilder()
        .setAuthor({name : member.user.username , iconURL : member.user.avatarURL()})
        .setDescription(
            `Username : ${member.user.username}
User Tag  : ${member.user.discriminator}
User ID   : ${member.user.id}
server    : ${interaction.guild.name}
serverID  : ${interaction.guildId}
joined at : ${member.joinedAt.toLocaleString()}`
        )
        .setThumbnail(
            interaction.guild.iconURL({dynamic : true})
        )
        interaction.reply({
            embeds : [embed],
            ephemeral : true
        })
    }
    catch(err){
        interaction.reply({
            content : `${err}`,
            ephemeral : true
        })
    }
    }else if(commandName === "img"){
        
        /*try{
            
        let image_name = options.getString("image_name")
        let index = options.getNumber("index")
        if(!index){
            interaction.deferReply({
                ephemeral : true
            })
                const results = await google.scrape(image_name, 200);
                
    
    
                interaction.editReply({
                    content : results[0].url,
                    
                })
        }else if(index > 0 && index < 201){
            interaction.deferReply({
                ephemeral : true
            })
                const results = await google.scrape(image_name, 200);
                
    
    
                interaction.editReply({
                    content : results[index.toFixed(0) - 1].url,
                    
                })
        }else{
            interaction.reply({
                content : "Image index must be between 1 and 200",
                ephemeral : true
            })
        }
    }
    catch(err){
        interaction.editReply({
            content : "Cannot get this image",

        })
    }*/
        interaction.reply({
            content : "This command is deleted !!",
            ephemeral : true
        })
        
    }else if(commandName === "meme"){
        
        fetch("https://meme-api.herokuapp.com/gimme")
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
                
                const img = result.url
                const title = result.title
                const embed = new discord.EmbedBuilder()
                .setTitle(title)
                .setImage(img)
                interaction.reply({
                    embeds : [embed],
                    ephemeral : false
                })
            }
        )
        .catch(
            (err)=>{
                interaction.reply({
                    content : "no meme",
                    ephemeral  : true
                })
            }
        )
    } else if(commandName === "play"){
        try{
        
        let name = options.getString("name")
        const voiceChannel = interaction.member?.voice?.channel
        if (voiceChannel) {
            interaction.reply({
                content : "```Searching for "+ `${name} ...` +"```"
            })
            distube.once("playSong",(queue,song)=>{
                const embed = new discord.EmbedBuilder()
                .setAuthor({name : interaction.member.user.username , iconURL : interaction.member.user.avatarURL()})
                .setTitle(`Playing ▶️ " ${song.name} "`)
                .setDescription(`duration : ${queue.formattedDuration}        |        volume  : ${queue.volume}        |        voice channel : ${queue.voiceChannel.name}`)
                .setThumbnail(song.thumbnail)
                .setFields([
                    {
                        name : "Settings",
                        value : `Stop music with /stop   |   Pause music with /pause   |   Resume with /resume   |   skip with /skip`
                    }
                ])
                const row = new discord.ActionRowBuilder()
                .setComponents(
                    new discord.ButtonBuilder()
                    .setCustomId("pause")
                    .setEmoji("⏸️")
                    .setStyle(ButtonStyle.Primary)
                ,new discord.ButtonBuilder()
                .setCustomId("resume")
                .setEmoji("▶️")
                .setStyle(ButtonStyle.Primary)
                ,
                new discord.ButtonBuilder()
                .setCustomId("skip")
                .setEmoji("⏭️")
                .setStyle(ButtonStyle.Primary)
                ,
                new discord.ButtonBuilder()
                .setCustomId("stop")
                .setEmoji("🛑")
                .setStyle(ButtonStyle.Danger)
                )
                
                interaction.channel.send({
                    embeds : [embed],
                    ephemeral : false,
                    components : [row]
                })
            })
            distube.once("addSong",(queue,song)=>{
                interaction.channel.send({
                    content : "```" +`" ${song.name} " in queue` +"```"
                })
            })
            distube.on("error",()=>{
                interaction.channel.send({
                    content : "``` Error => cannot play ```" + "```" + `${name}` + "```" 
                })
            })
            distube.play(voiceChannel, name,{
                textChannel : interaction.channel,
                member : interaction.member
            })
            
            
            .catch(
                (err)=>{
                    interaction.channel.send({
                        content : "```This song cannot be played"+ `: ${name}` +"```",
                        ephemeral : true
                    })
                }
            )
        }else{
            interaction.reply({
                content : "** ❌ You are not in voice channel **",
                ephemeral : true
            })
        }
    }
    catch(err){
        interaction.channel.send({
            content : `Console : ${err.message}`
        })

    }
    }
        else if(commandName === "stop"){
            if(distube.queues.size > 0){
                
            distube.stop(interaction.guild.id)
            .then(
                (result)=>{
                    interaction.reply({
                        content : `** Music stopped ⏹️ by ${interaction.member.user.username} **`,
                    })
                }
            )
            .catch(
                (err)=>{
                    interaction.reply({
                        content : `Error => ${err}`,
                        ephemeral : true
                    })
                }
            )
        }else{
            interaction.reply({
                content : "**❌ There is no music to stop it **",
                ephemeral : true
            })
        }
    }else if(commandName === "pause"){
        try{
        if(distube.queues.size > 0){
            distube.pause(interaction.guild.id)
            
            interaction.reply({
                content : `** Music paused ⏸️ by ${interaction.member.user.username}**`
            })
        }
    }catch(err){
        interaction.reply({
            content :  `**❌ ${err.message} **`,
            ephemeral : true
        })
    }
    }else if(commandName === "resume"){
        try{
        if(distube.queues.size > 0 ){
            distube.resume(interaction.guild.id)
            interaction.reply({
                content : `** Music resumed ▶️ by ${interaction.member.user.username} **`
            })
        }
    }catch(err){
        interaction.reply({
            content :  `**❌ ${err.message} **`,
            ephemeral : true
        })
    }
    }else if(commandName === "skip"){
        try{
        await distube.skip(interaction)
        interaction.reply({
            content : `** music skipped ⏭️ by ${interaction.member.user.username} **`
        })
        }
        catch(err){
            interaction.reply({
                content :  `**❌ ${err.message} **`,
                ephemeral : true 
            })
        }
    }else if(commandName === "volume"){
        try{
        let vl = options.getNumber("volume")
        if(!vl){
            distube.setVolume(interaction.guild.id,50)
            interaction.reply({
                content : "** Music volume changed to default 50% **"
            })
        }else if(vl >= 0 && vl <= 100){
            distube.setVolume(interaction.guild.id,vl)
            interaction.reply({
                content : `** Music volume changed to ${vl}% **`
            })
        }
        else{
            interaction.reply({
                content : "** Volume percentage must be between 0 and 100 **"
            })
        }
    }
    catch(err){
        interaction.reply({
            content : "```"+ `${err.message}` + "```"
        })
    }
    }else if(commandName === "quiz"){
        try{
        let cat = options.getNumber("category")
        if(!cat){
            fetch("https://opentdb.com/api.php?amount=1&difficulty=easy")
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
        let a = Math.floor(Math.random() * result.results[0].incorrect_answers.length)
                let an = result.results[0].incorrect_answers
                let sw = an[a]
                an[a] = result.results[0].correct_answer
                an.push(sw)
                console.log(result);
                console.log(result.results[0].correct_answer);
                console.log(an);
                let ans = an.join(" | ")
        
                let que = result.results[0].question.replace(/&quot;|&amp;|&#039;|&eacute;/g, ' ')
                const embed = new discord.EmbedBuilder()
                .setTitle(`${result.results[0].category}`)
                .setFields([
                    {
                        name : "difficulty" , value : `${result.results[0].difficulty}`
                    },
                    {
                        name : "quiz : " , value : `${que}`
                    },
                    {
                        name : "answers : " , value : `${ans}`
                    },
                    {
                        name : "timer" , value : "20s"
                    }
                ])
                
                interaction.reply({
                    embeds : [embed]
                })
                setTimeout(()=>{
                    interaction.editReply({
                        embeds : [],
                        content : "```" + `Timed out !! correct answer is : ${result.results[0].correct_answer}` + "```"
                    })
                },20000)
            }
        )
        }else if(cat == 1){
            fetch("https://opentdb.com/api.php?amount=1&category=15&difficulty=easy")
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
        let a = Math.floor(Math.random() * result.results[0].incorrect_answers.length)
                let an = result.results[0].incorrect_answers
                let sw = an[a]
                an[a] = result.results[0].correct_answer
                an.push(sw)
                let ans = an.join(" | ")
        
                let que = result.results[0].question.replace(/&quot;|&amp;|&#039;|&eacute;/g, ' ')
                const embed = new discord.EmbedBuilder()
                .setTitle(`${result.results[0].category}`)
                .setFields([
                    {
                        name : "difficulty" , value : `${result.results[0].difficulty}`
                    },
                    {
                        name : "quiz : " , value : `${que}`
                    },
                    {
                        name : "answers : " , value : `${ans}`
                    },
                    {
                        name : "timer" , value : "20s"
                    }
                ])
                
                interaction.reply({
                    embeds : [embed]
                })
                setTimeout(()=>{
                    interaction.editReply({
                        embeds : [],
                        content : "```" + `Timed out !! correct answer is : ${result.results[0].correct_answer}` + "```"
                    })
                },20000)
            }
        )
        }else if(cat == 2){
            fetch("https://opentdb.com/api.php?amount=1&category=21&difficulty=easy")
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
        let a = Math.floor(Math.random() * result.results[0].incorrect_answers.length)
                let an = result.results[0].incorrect_answers
                let sw = an[a]
                an[a] = result.results[0].correct_answer
                an.push(sw)
                let ans = an.join(" | ")
        
                let que = result.results[0].question.replace(/&quot;|&amp;|&#039;|&eacute;/g, ' ')
                const embed = new discord.EmbedBuilder()
                .setTitle(`${result.results[0].category}`)
                .setFields([
                    {
                        name : "difficulty" , value : `${result.results[0].difficulty}`
                    },
                    {
                        name : "quiz : " , value : `${que}`
                    },
                    {
                        name : "answers : " , value : `${ans}`
                    },
                    {
                        name : "timer" , value : "20s"
                    }
                ])
                
                interaction.reply({
                    embeds : [embed]
                })
                setTimeout(()=>{
                    interaction.editReply({
                        embeds : [],
                        content : "```" + `Timed out !! correct answer is : ${result.results[0].correct_answer}` + "```"
                    })
                },20000)
            }
        )
        }else if(cat == 3){
            fetch("https://opentdb.com/api.php?amount=1&category=23&difficulty=easy")
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
        let a = Math.floor(Math.random() * result.results[0].incorrect_answers.length)
                let an = result.results[0].incorrect_answers
                let sw = an[a]
                an[a] = result.results[0].correct_answer
                an.push(sw)
                let ans = an.join(" | ")
        
                let que = result.results[0].question.replace(/&quot;|&amp;|&#039;|&eacute;/g, ' ')
                const embed = new discord.EmbedBuilder()
                .setTitle(`${result.results[0].category}`)
                .setFields([
                    {
                        name : "difficulty" , value : `${result.results[0].difficulty}`
                    },
                    {
                        name : "quiz : " , value : `${que}`
                    },
                    {
                        name : "answers : " , value : `${ans}`
                    },
                    {
                        name : "timer" , value : "20s"
                    }
                ])
                
                interaction.reply({
                    embeds : [embed]
                })
                setTimeout(()=>{
                    interaction.editReply({
                        embeds : [],
                        content : "```" + `Timed out !! correct answer is : ${result.results[0].correct_answer}` + "```"
                    })
                },20000)
            }
        )
        }else if(cat == 4){
            fetch("https://opentdb.com/api.php?amount=1&category=11&difficulty=easy")
        .then(
            (result)=>{
                return result.json()
            }
        )
        .then(
            (result)=>{
        let a = Math.floor(Math.random() * result.results[0].incorrect_answers.length)
                let an = result.results[0].incorrect_answers
                let sw = an[a]
                an[a] = result.results[0].correct_answer
                an.push(sw)
                let ans = an.join(" | ")
        
                let que = result.results[0].question.replace(/&quot;|&amp;|&#039;|&eacute;/g, ' ')
                const embed = new discord.EmbedBuilder()
                .setTitle(`${result.results[0].category}`)
                .setFields([
                    {
                        name : "difficulty" , value : `${result.results[0].difficulty}`
                    },
                    {
                        name : "quiz : " , value : `${que}`
                    },
                    {
                        name : "answers : " , value : `${ans}`
                    },
                    {
                        name : "timer" , value : "20s"
                    }
                ])
                
                interaction.reply({
                    embeds : [embed]
                })
                setTimeout(()=>{
                    interaction.editReply({
                        embeds : [],
                        content : "```" + `Timed out !! correct answer is : ${result.results[0].correct_answer}` + "```"
                    })
                },20000)
            }
        )
        }else{
            interaction.reply({
                content : "Invalid category number"
            })
        }
    }
    catch(err){
        interaction.channel.send({
            content : "Error : cannot get quiz"
        })
    }
    }else if(commandName === "category"){
        interaction.reply({
            content : "```" + `
0 / -Random category
1 / -Video Games
2 / -Sports
3 / -History
4 / -Entertainment: Film` + "```"
        })
    }else if(commandName === "salta3_memes"){
        interaction.reply({
            content : "This command is deleted !!",
            ephemeral : true
        })
    }else if(commandName === "help"){
        interaction.reply({
            content : "Find all commands on : https://top.gg/bot/996509464523976805?s=0d7e7912e00ab#cmd",
            ephemeral : true
        })
    }else if(interaction.isButton()){
        if(interaction.customId === "pause"){
            try{
                if(distube.queues.size > 0){
                    distube.pause(interaction.guild.id)
                    
                    interaction.reply({
                        content : `** Music paused ⏸️ by ${interaction.member.user.username}**`
                    })
                }
            }catch(err){
                interaction.reply({
                    content :  `**❌ ${err.message} **`,
                    ephemeral : true
                })
            }
        }
        if(interaction.customId === "resume"){
            try{
                if(distube.queues.size > 0 ){
                    distube.resume(interaction.guild.id)
                    interaction.reply({
                        content : `** Music resumed ▶️ by ${interaction.member.user.username} **`
                    })
                }
            }catch(err){
                interaction.reply({
                    content :  `**❌ ${err.message} **`,
                    ephemeral : true
                })
            }
        }
        if(interaction.customId === "skip"){
            try{
                await distube.skip(interaction)
                interaction.reply({
                    content : `** music skipped ⏭️ by ${interaction.member.user.username} **`
                })
                }
                catch(err){
                    interaction.reply({
                        content :  `**❌ ${err.message} **`,
                        ephemeral : true 
                    })
                }
        }if(interaction.customId === "stop"){
            if(distube.queues.size > 0){
                
                distube.stop(interaction.guild.id)
                .then(
                    (result)=>{
                        interaction.reply({
                            content : `** Music stopped ⏹️ by ${interaction.member.user.username} **`,
                        })
                    }
                )
                .catch(
                    (err)=>{
                        interaction.reply({
                            content : `Error => ${err}`,
                            ephemeral : true
                        })
                    }
                )
            }else{
                interaction.reply({
                    content : "**❌ There is no music to stop it **",
                    ephemeral : true
                })
            }
        }
    }
    
    

})
 
// topgg data

const { AutoPoster } = require('topgg-autoposter');


const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5NjUwOTQ2NDUyMzk3NjgwNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU5NjQwOTM3fQ.tWTFUwgSIZIu1Qe8pRY544EWmy37d-JFFj8FiEl1T00', client)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})


client.login(process.env.TOKEN)



