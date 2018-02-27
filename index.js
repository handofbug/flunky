let config = require('config-yml');


let settings = require('./config/settings.json');
//If dev, use local config.yml settings
settings.token = (process.env.NODE_ENV === "dev" ? config.token : settings.token);





console.log(settings);