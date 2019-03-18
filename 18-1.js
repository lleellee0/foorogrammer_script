
// 웹툰 메인 URL 입력 => 해당 웹툰의 모든 화 URL(ID 얻기)
// http://webtoon.daum.net/data/pc/webtoon/view/{웹툰이름}
// obj.data.webtoon.webtoonEpisodes[i].id

// 각 화의 URL 입력 => 해당 화의 모든 웹툰 이미지 URL
// http://webtoon.daum.net/data/pc/webtoon/viewer_images/{각화의 id}
// obj.data[i].url

// 해당 화의 모든 웹툰 이미지 URL => 파일로 다운로드


let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

const downloadImage = (url, no, i) => {
    request(
        {
            url: url,
            encoding: null
        }, function (error, response, body) {

        fs.writeFile(`${no}_${i}.jpg`, body, null, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
}

const getImageUrls = (articleId, no) => {
    request({url: `http://webtoon.daum.net/data/pc/webtoon/viewer_images/${articleId}`}, function (error, response, body) {
        body = JSON.parse(body);
        for(let i = 0; i < body.data.length; i++)
            downloadImage(body.data[i].url, no, i);
    });
}

const getArticlesIds = (url) => {
    request({url: url}, function (error, response, body) {
        body = JSON.parse(body);
        for(let i = 0; i < body.data.webtoon.webtoonEpisodes.length; i++) {
            if(body.data.webtoon.webtoonEpisodes[i].serviceType === "free")
                getImageUrls(body.data.webtoon.webtoonEpisodes[i].id, body.data.webtoon.webtoonEpisodes[i].episode);
        }
    });
}

getArticlesIds(`http://webtoon.daum.net/data/pc/webtoon/view/driftprison`);