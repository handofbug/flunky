class Test {
    constructor() {
        this.pattern = /hi/gi;
    }
    Timer() {

    }
    Command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {
            this.Send(message,'hi');
        }
    }
    Send(message, text) {
        message.channel.send(text);
    }
}
module.exports = new Test();