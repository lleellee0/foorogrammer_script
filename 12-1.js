let request = require('request');
let cheerio = require('cheerio');

let prevNotice = "";

const requestTopNotice = () => {
    request('https://comic.naver.com/notice/list.nhn?searchWord=%EC%9C%A0%EB%A3%8C%ED%99%94', function (error, response, body) {
        const $ = cheerio.load(body);

        if(prevNotice === $('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, ""))
            console.log("새로운 공지사항이 없습니다.");
        else
            console.log("새로운 공지사항이 있습니다.");

        prevNotice = $('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, "");
        console.log($('.tbl_notice tr span.txt')[0].children[0].data.replace(/[\t\n]/g, ""));
    });
}

setInterval(requestTopNotice, 5 * 1000);