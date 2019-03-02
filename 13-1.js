let request = require('request');
let cheerio = require('cheerio');

const TeleBot = require('telebot');
const bot = new TeleBot('792314094:AAFLqaf6IV_4EXxlfkd81olY28N8As0l-JQ');

let subscribers = [];
bot.on(['/start', '/hello'], (msg) => {
        msg.reply.text('구독이 완료되었습니다.');
        subscribers.push(msg.from.id);
    }
);

bot.start();
let prevNotice = "";

const requestTopNotice = () => {
    request('https://comic.naver.com/notice/list.nhn?searchWord=%EC%9C%A0%EB%A3%8C%ED%99%94', function (error, response, body) {
        const $ = cheerio.load(body);

        if(prevNotice === $('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, ""))
            console.log("새로운 공지사항이 없습니다.");
        else
            subscribers.forEach(v => bot.sendMessage(v, `https://comic.naver.com/notice/list.nhn?searchWord=%EC%9C%A0%EB%A3%8C%ED%99%94`));

        prevNotice = $('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, "");
        console.log($('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, ""));
    });
}

setInterval(requestTopNotice, 5 * 1000);