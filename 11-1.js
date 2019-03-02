let request = require('request');
let cheerio = require('cheerio');
request('https://comic.naver.com/notice/list.nhn?searchWord=%EC%9C%A0%EB%A3%8C%ED%99%94', function (error, response, body) {
    const $ = cheerio.load(body);
    for(let i = 0; i < $('.tbl_notice tr span.txt').length; i++)
        console.log($('.tbl_notice tr span.txt')[i].children[0].data.replace(/[\t\n]/g, ""));
});