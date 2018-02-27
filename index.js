const path = require('path');
const fs = require('fs');
const config = require('config-yml');
const modules = {};
const settings = require('./config/settings.json');

//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);

fs.readdirSync(path.join(__dirname, "modules")).forEach(file => {
    const module = require('./modules/' + file);
    modules[file] = module;
});




console.log(settings);
console.log(modules);