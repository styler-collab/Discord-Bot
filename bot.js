//node bot.js to start bot
const Discord = require('discord.js')
const { token } = require('./constants/token')
const client = new Discord.Client()
const fetch = require("node-fetch");

//change token in token.json
client.login(token);

//tells you on terminal below which bot token you have
client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});


//take command
client.on('message', msg => {
    //this is the only current command !fact to throw random fact
    if(msg.content === '!fact'){
        //this website has 1400ish random facts
        var id = Math.floor((Math.random() * 1399) + 1);
        fetch('http://www.randomfactgenerator.net/?id=' + id).then(function(url){
            fact = url.text().then(function(text){
                var index = 2077
                while (text.charAt(index) != '<'){
                    index++;
                }
                var fact = text.substring(2077, index);
                //hit 'em with that knowledge
                msg.channel.send(fact);
            })
        });

    }
});
