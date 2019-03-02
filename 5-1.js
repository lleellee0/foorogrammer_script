let request = require('request');
let cheerio = require('cheerio');
request('https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=244&weekday=thu', function (error, response, body) {
    const $ = cheerio.load(body);
    for(let i = 0; i < $('.wt_viewer img').length; i++)
        console.log($('.wt_viewer img')[i].attribs.src);
});