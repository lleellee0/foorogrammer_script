// let WebSocketClient = require('websocket').client;
 
// let client = new WebSocketClient();
 
// client.on('connectFailed', function(error) {
//     console.log('Connect Error: ' + error.toString());
// });
 
// client.on('connect', function(connection) {
//     console.log(connection);
//     console.log('WebSocket Client Connected');
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: " + message.utf8Data);
//             connection.sendUTF(message.utf8Data.replace("ping", "pong"));
//         }
//     });
    
//     function sendNumber() {
//         if (connection.connected) {
//             console.log("sendNumber " + "{\"exchange\":1}");
//             // connection.sendUTF("{\"exchange\":1}");
//             connection.send("{\"m\":0,\"i\":4,\"n\":\"GetNoticesList\",\"o\":\"{}\"}");
            
//             setTimeout(sendNumber, 1000);
//         }
//     }
//     sendNumber();
// });
 
// client.connect('wss://wss.gopax.co.kr/primus', 'echo-protocol');



var W3CWebSocket = require('websocket').w3cwebsocket;
 
var client = new W3CWebSocket('wss://wss.gopax.co.kr/primus', 'echo-protocol');
 
client.onerror = function() {
    console.log('Connection Error');
};
 
client.onopen = function() {
    console.log('WebSocket Client Connected');
 
    function sendNumber() {
        if (client.readyState === client.OPEN) {
            client.send("{\"exchange\":1}");
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
};
 
client.onclose = function() {
    console.log('echo-protocol Client Closed');
};
 
client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
        client.send(e.data.replace("ping", "pong"));
    }
};