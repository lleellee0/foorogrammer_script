let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

// https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=244&weekday=thu

const downloadImage = (path, url) => {
    request(
        {
            url: url,
            headers: {'referer': 'https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=244&weekday=thu'},
            encoding: null
        }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    fs.writeFile(path + '\\' + (url.split('_IMAG')[1]), body, null, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
}

request('https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=244&weekday=thu', function (error, response, body) {
    const $ = cheerio.load(body);
    for(let i = 0; i < $('.wt_viewer img').length; i++)
        downloadImage("download", $('.wt_viewer img')[i].attribs.src);
});