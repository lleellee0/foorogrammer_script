let request = require('request');
let cheerio = require('cheerio');

const TeleBot = require('telebot');
const bot = new TeleBot('789234981:AAHnRVGoWaFjEFZujIIeF8gmduXxDpyHmtA');

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

        if(prevNotice !== $('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, ""))
            subscribers.forEach(v => bot.sendMessage(v, `https://comic.naver.com/notice/list.nhn?searchWord=%EC%9C%A0%EB%A3%8C%ED%99%94`));
        else
            subscribers.forEach(v => bot.sendMessage(v, '새로운 메시지가 없습니다.'));

        prevNotice = $('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, "");
        console.log($('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, ""));
    });
}

requestTopNotice();
setInterval(requestTopNotice, 24 * 60 * 60 * 1000);

forever 설치
    npm install -g forever

forever 실행
    forever main.js

nohup으로 실행
    nohup forever main.js *

crontab 등록
    crontab -e 후에 vi 에디터에
    30 * * * * nohup forever main.js &
    등록 후 저장


crontab 목록 보기
    crontab -l