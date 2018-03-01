const config = require('config-yml');
const db = require('monk')(process.env.NODE_ENV === "dev" ? config.db : settings.db);
const settings = require('./config/settings.json');

const Discord = require('discord.js');
const Modules = require('./src/modules');
const EventEmitter = require('events').EventEmitter;

const client = new Discord.Client();
const eventEmmiter = new EventEmitter();
const modules = new Modules(eventEmmiter, db).loadModules();

//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);

const timer = setInterval(() => {
    eventEmmiter.emit('tick', {
        time: new Date().getUnixTime()
    });
}, 1000);

client.on('ready', () => {
    eventEmmiter.emit('ready');
    console.log('flunky here!');
});

client.on('message', (message) => {
    modules.onMessage(message)
})

client.login(settings.token);

Date.prototype.getUnixTime = function () {
    return this.getTime() / 1000 | 0
};