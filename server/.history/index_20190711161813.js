const ws = require('ws');

const webSocketServer = new (ws).Server({ port: (process.env.PORT || 3000) });

const webSockets = {};

// CONNECT /:userID
// wscat -c ws://localhost:3000/1
webSocketServer.on('connection', (webSocket, request) => {
  console.log('connection', request.url.substr(1, request.url.length - 1));
  const playerId = request.url.substr(1, request.url.length - 1);
  webSockets[playerId] = webSocket;
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

    if (jsonMessage.action === 'CREATE') {
      console.log('CREATE', jsonMessage.gameId);
      webSocket[jsonMessage.playerId].send(JSON.stringify({ playerId, result: 'OK' });
    }

    // const toUserWebSocket = webSockets[jsonMessage.gameId];
    // if (toUserWebSocket) {
    //   console.log(`sending to ${playerId}`);
    //   //   messageArray[0] = userID;
    //   toUserWebSocket.send(JSON.stringify({ playerId, result: 'OK' }));
    // }
  });

  webSocket.on('close', () => {
    console.log('close');
    // delete webSockets[userID];
    // console.log(`deleted: ${userID}`);
  });
});
