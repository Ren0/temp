const ws = require('ws');

const webSocketServer = new (ws).Server({ port: (process.env.PORT || 3000) });

const webSockets = {}; // userID: webSocket

// CONNECT /:userID
// wscat -c ws://localhost:3000/1
webSocketServer.on('connection', (webSocket, request) => {
  console.log(request.url);
  const userID = parseInt(request.url.substr(1), 10);
  webSockets[userID] = webSocket;
  console.log(`connected: ${userID} in ${Object.getOwnPropertyNames(webSockets)}`);

  // Forward Message
  //
  // Receive               Example
  // [toUserID, text]      [2, "Hello, World!"]
  //
  // Send                  Example
  // [fromUserID, text]    [1, "Hello, World!"]
  webSocket.on('message', (message) => {
    console.log(`received from ${userID}: ${message}`);
    const messageArray = JSON.parse(message);
    const toUserWebSocket = webSockets[messageArray[0]];
    if (toUserWebSocket) {
      console.log(`sent to ${messageArray[0]}: ${JSON.stringify(messageArray)}`);
      messageArray[0] = userID;
      toUserWebSocket.send(JSON.stringify(messageArray));
    }
  });

  webSocket.on('close', () => {
    delete webSockets[userID];
    console.log(`deleted: ${userID}`);
  });
});
