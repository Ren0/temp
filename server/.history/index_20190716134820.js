const ws = require('ws');
const { Chess } = require('./node_modules/chess.js');

const webSocketServer = new (ws).Server({ port: (process.env.PORT || 3000) });

const webSockets = {};
const games = {};

const send = (playerId, payload) => {
  if (webSockets[playerId]) {
    webSockets[playerId].send(JSON.stringify(payload));
  }
};

webSocketServer.on('connection', (webSocket, request) => {
  console.log('connection', request.url.substr(1, request.url.length - 1));
  const playerId = request.url.substr(1, request.url.length - 1);
  webSockets[playerId] = webSocket;
  console.log(`connected: ${playerId} in ${Object.getOwnPropertyNames(webSockets)}`);

  webSocket.on('message', (message) => {
    console.log('message', message);
    const jsonMessage = JSON.parse(message);
    const { action, gameId } = jsonMessage;

    if (action === 'CREATE') {
      games[gameId] = { creator: playerId, chess: new Chess() };
      const payload = { gameId, chess: games[gameId].chess, mutation: 'GAME_CREATED' };
      send(playerId, payload);
    }
    // if (action === 'JOIN') {
    //   if (games[gameId]) {
    //     games[gameId] = { ...games[gameId], joiner: playerId };
    //     webSockets[playerId].send(JSON.stringify({
    //       gameId, result: 'JOINED', game: games[gameId].game.ascii(), mutation: 'GAMECREATED',
    //     }));
    //     webSockets[games[gameId].creator].send(JSON.stringify({
    //       gameId, result: 'JOINED', game: games[gameId].chess.ascii(), mutation: 'GAMECREATED',
    //     }));
    //   } else {
    //     webSockets[playerId].send(JSON.stringify({
    //       gameId, result: 'CANNOT_JOIN', game: games[gameId].chess.ascii(), mutation: 'CANNOTJOIN',
    //     }));
    //   }
    // }
    if (action === 'FETCH') {
      // create game if does not exist, join game if exists
      if (!games[gameId]) {
        console.log('creating new game: ', gameId);
        games[gameId] = { creator: playerId, chess: new Chess() };
        const payload = { gameId, chess: games[gameId].chess, mutation: 'GAME_CREATED' };
        send(playerId, payload);
      } else {
        console.log('fetching game: ', gameId);
        games[gameId] = { ...games[gameId], joiner: playerId };
        const payload = { gameId, chess: games[gameId].chess, mutation: 'GAME_FETCHED' };
        send(playerId, payload);
        send(games[gameId].creator, payload);
      }
    }
    if (action === 'MOVE') {
      const { chess, creator, joiner } = games[gameId];
      const moves = chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      chess.move(move);

      const payload = { gameId, chess: chess.ascii(), mutation: 'GAME_MOVE' };
      send(creator, payload);
      send(joiner, payload);
    }
  });

//   webSocket.on('close', () => {
//     console.log('close');
//     delete webSockets[playerId];
//     console.log(`deleted: ${playerId}`);
//   });
});
