class Test {
    constructor() {
        this.pattern = /hi/gi;
        this.queue = new Map();
    }
    event(eventEmmiter) {
        this.eventEmmiter = eventEmmiter;
        this.eventEmmiter.on('tick', this.timer.bind(this));
        return this;
    }
    db(db) {
        this.db = db;
        return this;
    }
    timer() {
        console.log('test tick');
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
module.exports = new Test();