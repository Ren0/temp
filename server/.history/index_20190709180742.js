const ws = require('ws');

const webSocketServer = new (ws).Server({ port: (process.env.PORT || 3000) });

const webSockets = {}; // userID: webSocket

// CONNECT /:userID
// wscat -c ws://localhost:3000/1
webSocketServer.on('connection', (webSocket, request) => {
  console.log('connection');
  const gameId = parseInt(request.url.substr(1), 10);
  console.log('gameId', gameId);
  webSockets[gameId] = webSocket;
  console.log(`connected: ${gameId} in ${Object.getOwnPropertyNames(webSockets)}`);

  // Forward Message
  //
  // Receive               Example
  // [toUserID, text]      [2, "Hello, World!"]
  //
  // Send                  Example
  // [fromUserID, text]    [1, "Hello, World!"]
  webSocket.on('message', (message) => {
    // console.log(`received from ${userID}: ${message}`);
    console.log('message', message.gameId);
    // const messageArray = JSON.parse(message);

    console.log('websockets', webSockets[message.gameId]);
    const toUserWebSocket = webSockets[message.gameId];

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
