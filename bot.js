//functionally this code just does !join and !leave voice chats and stores everything said locally
//nodemon + ffmpeg + node-opus add to machine
//node bot.js to start bot
const Discord = require('discord.js')
const fs = require('fs')
const { token } = require('./constants/token')
const client = new Discord.Client()

//change token in token.json
client.login(token);

//tells you on terminal below which bot token you have
client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

//function to store audio files
function out(voiceChannel, user){
    const location = './audio/${Date.now()}.pcm';
    return fs.createWriteStream(location);
}

//take command
client.on('message', msg => {
    //this is the only current command !join to join your voice channel
    if(msg.content === '!join'){
        if(msg.member.voiceChannel){
            msg.member.voiceChannel.join()
            .then(connection => {
                msg.reply('I have joined the channel!');

                const receiver = connection.createReceiver();

                connection.on('speaking', (user, speaking) => {
                    if (speaking) {
                        //debug code
                        msg.channel.sendMessage(`I'm listening to ${user}`);

                        //this takes a pcm stream and writes it locally
                        const input = receiver.createPCMStream(user);
                        const output = out(voiceChannel, user);
                        input.pipe(output);
                        output.on("data", console.log);

                        //debug code
                        audioStream.on('end', () => {
                            msg.channel.sendMessage(`I'm no longer listening to ${user}`);
                        });
                    }
                });
            })
            .catch(console.log);
        }else{
            msg.reply('Join a voice channel first!');
        }
    }
    if(msg.content === '!leave'){
        msg.member.voiceChannel.leave()
        msg.reply('I have left the channel!');
    }
});
