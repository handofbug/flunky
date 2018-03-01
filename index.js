const Discord = require('discord.js');
const EventEmitter = require('events').EventEmitter;
const config = require('config-yml');
const db = require('monk')(process.env.NODE_ENV === "dev" ? config.db : settings.db);

const users = db.get('discord');
users.insert({'a':1});

const client = new Discord.Client();
const eventEmmiter = new EventEmitter();

const modules = require('./src/modules').event(eventEmmiter).db(db).loadModules();
const settings = require('./config/settings.json');

//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);

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