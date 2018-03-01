class BaseModule {
    constructor(eventEmmiter, db) {
        this.eventEmmiter = eventEmmiter;
        this.eventEmmiter.on('tick', this.timer.bind(this));
        this.db = db.get(this.constructor.name);
        this.init();
    }
    init() {
        this.pattern = /hi/gi;
    }
    timer() {
        console.log(this.constructor.name + ' tick');
    }
    command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {
            this.send(message, 'hi');
        }
    }
    send(message, text) {
        message.channel.send(text);
    }
}
module.exports = BaseModule;