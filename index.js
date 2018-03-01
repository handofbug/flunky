const Discord = require('discord.js');
const config = require('config-yml');
const client = new Discord.Client();
const modules = require('./src/modules').load();
const settings = require('./config/settings.json');

//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);;


client.on('ready', () => {
    console.log('flunky here!');
});

client.on('message', (message) => {
    modules.onMessage(message)
})

client.login(settings.token);