const BaseModule = require('./baseModule');
const Discord = require('discord.js');

class Pikabu extends BaseModule {
    init() {
        this.pattern = /pikabu/gi;

        this.db.aggregate({
            $group: {
                _id: null,
                max: {
                    $max: "$post"
                },
                lastPostTime: {
                    $max: "$datetime"
                }
            }
        }).then(data => {
            this.id = data[0].max + 1;
            this.lastPostTime = data[0].lastPostTime;
        }).catch(err => {
            console.log('error ' + err);
            this.id = 5742783;
            this.lastPostTime = 1519915019;
        });
    }
    timer(args) {
        this.time = args.time;
        const url = 'https://new.pikabu.ru/story/_' + this.id;
        this.needle('get', url).then(res => {
            let $ = this.cheerio.load(res.body);
            if (!$('.app__404').length) {
                let rating = $('.story__rating-count').text().trim();
                let datetimeStamp = new Date($('.story__datetime').attr('datetime')).getUnixTime();
                let obj = {
                    post: this.id,
                    url: url,
                    rating: $('.story__rating-count').text().trim(),
                    title: $('.story__title').text().trim(),
                    datetime: new Date($('.story__datetime').attr('datetime')).getUnixTime(),
                    ratio: rating / (this.time - datetimeStamp),
                    data: [],
                    viewed: []
                };
                $('.story-block').each((index, element) => {
                    if ($(element).hasClass('story-block_type_text')) {
                        obj.data.push({
                            'text': $(element).text().trim()
                        });
                    }
                    if ($(element).hasClass('story-block_type_image')) {
                        if ($(element).find('.player').length) {
                            obj.data.push({
                                'gif': $(element).find('.player').attr('data-source')
                            });
                        } else {
                            obj.data.push({
                                'img': $(element).find('img').attr('data-large-image')
                            });
                        }
                    }
                    if ($(element).hasClass('story-block_type_video')) {
                        obj.data.push({
                            'video': $(element).find('.player').attr('data-source')
                        });
                    }
                });
                this.db.insert(obj);
                this.id++;
                this.lastPostTime = new Date($('.story__datetime').attr('datetime')).getUnixTime();
            } else {
                if (this.time - this.lastPostTime > 300) {
                    this.id++;
                }
            }
        }).catch(err => {
            console.error('error ' + err);
        });
    }

    command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {

            this.db.findOneAndUpdate({
                viewed: {
                    $ne: message.channel.id
                }
            }, {
                $push: {
                    viewed: message.channel.id
                }
            }, {
                sort: {
                    ratio: -1
                }
            }).then(data => {
                const msg = {
                    embed: {
                        color: 3447003,
                        title: data.title,
                        author: {
                            name: "pikabu.ru"
                        },
                        url: data.url,
                        description: '',
                        timestamp: new Date(data.datetime * 1000),
                        footer: {
                            text: data.rating + ' плюсов'
                        }
                    }
                };

                data.data.forEach(element => {
                    if (element['img']) msg.embed.image = {
                        url: element.img
                    };
                    if (element['video']) msg.embed.image = {
                        url: element.img
                    };
                    if (element['gif']) msg.embed.image = {
                        url: element.img
                    };
                    if (element['text']) msg.embed.description = element.text.slice(0,2040) + '...';
                });
                this.send(message, msg);
            })
        }
    }
}
module.exports = Pikabu;