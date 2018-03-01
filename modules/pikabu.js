const BaseModule = require('./baseModule');

class Pikabu extends BaseModule {
    init() {
        this.pattern = /pikabu/gi;
        // this.id =
    }
    timer(args) {

        this.time = args.time;

        // console.log(this.constructor.name);
        this.db.find({}).then(data => {
            // console.log('object');
            // console.log(data);
        })
    }

//     0.0013196814562002276
// 116
// 1519834487
// 1519922387
    command(message) {
        if (message.content.match(this.pattern) && message.author.id !== message.client.user.id) {

            this.needle('get', 'https://new.pikabu.ru/story/_5745502').then(res => {
                let $ = this.cheerio.load(res.body);
                let a = $('.story__rating-count').text().trim();
                let b = new Date($('.story__datetime').attr('datetime')).getUnixTime();
                let c = this.time;
                console.log(a / (c - b));
                console.log($('.story__rating-count').text().trim());
                console.log(new Date($('.story__datetime').attr('datetime')).getUnixTime());
                console.log(this.time);


                if (!$('.app__404').length) {
                    const obj = {
                        rating: $('.story__rating-count').text().trim(),
                        title: $('.story__title').text().trim(),
                        datetime: new Date($('.story__datetime').attr('datetime')).getUnixTime(),
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
                    // this.db.insert(obj)
                    // console.log(obj);
                } else {}
            }).catch(err => {
                console.log('error');
                console.log(err);
            });
            this.db.findOne().then(data => {
                // console.log(data);
            })

            this.send(message, 'pikapika');
        }
    }
}
module.exports = Pikabu;