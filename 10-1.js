var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // "primus::ping::1550747623328"
            if(message.utf8Data.includes("primus::ping"))
                connection.sendUTF(message.utf8Data.replace("primus::ping", "primus::pong"));

            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            //     "{\"exchange\":1}"
            console.log("\"{\\\"exchange\\\":1}\"");
            connection.sendUTF("\"{\\\"exchange\\\":1}\"");

            setTimeout(() => {
                            //     "{\"m\":0,\"i\":4,\"n\":\"GetNoticesList\",\"o\":\"{}\"}"
            console.log("\"{\\\"m\\\":0,\\\"i\\\":4,\\\"n\\\":\\\"GetNoticesList\\\",\\\"o\\\":\\\"{}\\\"}\"");
            connection.sendUTF("\"{\\\"m\\\":0,\\\"i\\\":4,\\\"n\\\":\\\"GetNoticesList\\\",\\\"o\\\":\\\"{}\\\"}\"");
            }, 200);

        }
    }
    sendNumber();
});
 
client.connect('wss://wss.gopax.co.kr/primus', 'echo-protocol');