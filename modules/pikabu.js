const BaseModule = require('../src/baseModule');

class Pikabu extends BaseModule {    
    init() {
        this.pattern = /pikabu/gi;
    }
    timer() {
        console.log(this.constructor.name);
        this.db.find({}).then(data => {
            // console.log('object');
            console.log(data);
        })
    }
    command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {
            this.send(message, 'pikapika');
        }
    }
}
module.exports = Pikabu;