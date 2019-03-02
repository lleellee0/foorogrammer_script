let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

const downloadImage = (path, url, titleId, no, retryCount) => {
    request(
        {
            url: url,
            headers: {'referer': `https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}`},
            encoding: null
        }, function (error, response, body) {
            if(error && --retryCount >= 0) {
                console.log(`재시도 ${titleId} ${no} ${retryCount}`);
                downloadImage(path, url, titleId, no, retryCount);
                return;
            }
    fs.writeFile(path + '\\' + `${titleId}_${no}_${(url.split('_IMAG01_')[1])}`, body, null, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
}

const getImageUrls = (titleId, no, nidAut, nidSes) => {
    let j = request.jar();
    let cookie1 = request.cookie(`NID_AUT=${nidAut}`);
    let cookie2 = request.cookie(`NID_SES=${nidSes}`);
    let url = 'https://comic.naver.com';
    j.setCookie(cookie1, url);
    j.setCookie(cookie2, url);
    
    request({url: `https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}`, jar: j}, function (error, response, body) {
        console.log(response);
        // const $ = cheerio.load(body);
        // for(let i = 0; i < $('.wt_viewer img').length; i++)
        //     downloadImage("download", $('.wt_viewer img')[i].attribs.src, titleId, no, 5);
    });
}

for(let i = 131, j = 0; i <= 131; i++, j++) {
    setTimeout(() => {
        getImageUrls(660366, i, '43I6NMoI8hvCWDGCxPbL4VupSpiQiS5UuQZfSuG3w620bRtfTg79PxZnsaxUEzR1', 'AAABjr/zCBasiRNIfyt04TPLn9Ga/A0h4rOa8ZVU9f/Mi91J5S+5DnebpWdepvH5guhFPI/7svD/1baLwzxVznRzxyviTXmZf3b46FGBArwwfDlSorjchTXuXRupQ1nbWLliJyxFlF8wOn+OpWurcrZUTAU7rOYaP1Jn2xZs6ZKVE3WTeSHkpYMWsfC66+JHqHTPhzik6UavpNfEzkds3U1ltOCApd2dJDfT2rjodyX2SCsDAF0xSOg8peaXktvcOsFcg+qK87h2JpYIdWMu4IXSB7OY/dzcIOOds4YHcllYxxAm3OfUZvUO23fWcJfFmxPfk0Z8lpc3w4JkuHVr3DC5pZ5E/ofciC1XVMb9pO+QUp5TwfyQwBlOJvbcqEE1C4TyS6O6JaayEZsdquyTFLZnIRBYLITHasYA37OiXhlyuX51mKGCUzXuKmi2VIBHynXjKdfxBN1AMCBdBEm24I6VYYdzgBNDlW159Oq+j0BeLvtFLIXMJSEYGz9n1ClVPvVzuS+oipBlol9khLz+q6q10sc=');
    }, j * 1000);
}