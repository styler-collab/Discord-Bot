//nodemon + ffmpeg + node-opus add to machine
//node bot.js to start bot
const Discord = require('discord.js')
const { token } = require('./constants/token')
const client = new Discord.Client()

//change token in token.json
client.login(token);

//tells you on terminal below which bot token you have
client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

//take command
client.on('message', async msg => {
    //does not work if not in a discord
    if(!message.guild) return;

    //this is the only current command !join to join your voice channel
    if(msg.content === '!join'){
        if(message.member.voiceChannel){
            message.member.voiceChannel.join()
            .then(connection => {
                message.reply('I have joined the channel!');

                const receiver = connection.createReceiver();
                connection.on('speaking', (user,speaking) => {
                    if(speaking){
                        const audioStream = reciever.createPCMStream(user);
                        

                    }
                })
            })
            .catch(console.log);
        }else{
            message.reply('Join a voice channel first!');
        }
    }
});
