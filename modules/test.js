module.exports = {
    textActions: [{
        description: 'Just a hello',
        pattern: /hi/gi,
        func: (message) => {
            console.log(this.textActions);
            message.channel.send('hello to u');
        }
    }],
    timerActions:[]
}