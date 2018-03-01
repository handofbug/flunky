class Pikabu {
    constructor() {
        this.pattern = /pikabu/gi;
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
        const a = this.db.get('pikabu');
        a.find({}).then(data => {
            console.log('object');
            console.log(data);
        })
        console.log('pikabu tick');
    }
    command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {
            this.send(message, 'pikapika');
        }
    }
    send(message, text) {
        message.channel.send(text);
    }
}
module.exports = new Pikabu();