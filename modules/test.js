const BaseModule = require('../src/baseModule');

class Test extends BaseModule{
    init() {
        this.pattern = /test/gi;
    }
    command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {
            this.send(message, 'hi!!!!!!!');
        }
    }
}
module.exports = Test;