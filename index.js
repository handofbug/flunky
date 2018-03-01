const Discord = require('discord.js');
const EventEmitter = require('events').EventEmitter;
const config = require('config-yml');

const client = new Discord.Client();
const eventEmmiter = new EventEmitter();

const modules = require('./src/modules').event(eventEmmiter).loadModules();
const settings = require('./config/settings.json');

//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);;

const timer = setInterval(() => {
    eventEmmiter.emit('tick');
}, 1000);

client.on('ready', () => {
    eventEmmiter.emit('ready');
    console.log('flunky here!');
});

client.on('message', (message) => {
    modules.onMessage(message)
})

client.login(settings.token);