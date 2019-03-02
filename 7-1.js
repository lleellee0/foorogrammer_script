let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

// https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=244&weekday=thu
// titleId_no_??.jpg => 570503_244_1.jpg

const downloadImage = (path, url, titleId, no, retryCount) => {
    request(
        {
            url: url,
            headers: {'referer': `https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}&weekday=thu`},
            encoding: null
        }, function (error, response, body) {
            if(error && --retryCount >= 0) {
                console.log(`재시도 ${titleId} ${no} ${retryCount}`);
                downloadImage(path, url, titleId, no, retryCount);
                return;
            }
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    fs.writeFile(path + '\\' + `${titleId}_${no}_${(url.split('_IMAG01_')[1])}`, body, null, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
}

const getImageUrls = (titleId, no) => {
    request(`https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}&weekday=thu`, function (error, response, body) {
        const $ = cheerio.load(body);
        for(let i = 0; i < $('.wt_viewer img').length; i++)
            downloadImage("download", $('.wt_viewer img')[i].attribs.src, titleId, no, 5);
    });
}

for(let i = 1, j = 0; i < 15; i++, j++) {
    setTimeout(() => {
        getImageUrls(570503, i);
    }, j * 1000);
    getImageUrls(570503, i);
}