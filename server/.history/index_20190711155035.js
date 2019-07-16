const ws = require('ws');

const webSocketServer = new (ws).Server({ port: (process.env.PORT || 3000) });

const webSockets = {}; // userID: webSocket

// CONNECT /:userID
// wscat -c ws://localhost:3000/1
webSocketServer.on('connection', (webSocket, request) => {
  console.log('connection', request.url.substr(1, request.url.length - 1));
  const playerId = parseInt(request.url.substr(1), 10);
  console.log('playerId', playerId);
  //   if (!webSockets[gameId]) {
  //     webSockets[gameId] = webSocket;
  //   }
  console.log(`connected: ${playerId} in ${Object.getOwnPropertyNames(webSockets)}`);

  // Forward Message
  //
  // Receive               Example
  // [toUserID, text]      [2, "Hello, World!"]
  //
  // Send                  Example
  // [fromUserID, text]    [1, "Hello, World!"]
  webSocket.on('message', (message) => {
    console.log('message', message);
    const jsonMessage = JSON.parse(message);
    const toUserWebSocket = webSockets[jsonMessage.gameId];
    if (toUserWebSocket) {
      console.log(`sending to ${gameId}`);
      //   messageArray[0] = userID;
      toUserWebSocket.send(JSON.stringify({ gameId, result: 'OK' }));
    }
  });

  webSocket.on('close', () => {
    console.log('close');
    // delete webSockets[userID];
    // console.log(`deleted: ${userID}`);
  });
});
