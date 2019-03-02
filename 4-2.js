let request = require('request');
request('https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=244&weekday=thu', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
    console.log(body);
});