const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const config = require('config-yml');
const client = new Discord.Client();
const modules = {};
const settings = require('./config/settings.json');

//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);

fs.readdirSync(path.join(__dirname, "modules")).forEach(file => {
    const module = require('./modules/' + file);
    modules[file] = module;
});

client.on('ready', () => {
    console.log('flunky here!');
});


client.on('message', (message) => {
    Object.keys(modules).forEach(key => {
        const module = modules[key];
        module.textActions.forEach(cmd => {
            if (message.content.match(cmd.pattern)) {
                cmd.func(message);
            }
        })
    })
})

client.login(settings.token);