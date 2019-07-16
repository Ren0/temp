const ws = require('ws');
const { Chess } = require('./node_modules/chess.js');

const webSocketServer = new (ws).Server({ port: (process.env.PORT || 3000) });

const webSockets = {};
const games = {};

const send = (playerId) => {
  console.log(webSockets[playerId]);
  if (webSockets[playerId]) {
    webSockets[playerId].send(JSON.stringify({
      gameId, game, mutation: 'MOVE',
    }));
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
      games[gameId] = { creator: playerId, game: new Chess() };
      webSockets[playerId].send(JSON.stringify({ gameId, result: 'CREATED' }));
    }
    if (action === 'JOIN') {
      if (games[gameId]) {
        games[gameId] = { ...games[gameId], joiner: playerId };
        webSockets[playerId].send(JSON.stringify({
          gameId, result: 'JOINED', game: games[gameId].game.ascii(), mutation: 'GAMECREATED',
        }));
        webSockets[games[gameId].creator].send(JSON.stringify({
          gameId, result: 'JOINED', game: games[gameId].game.ascii(), mutation: 'GAMECREATED',
        }));
      } else {
        webSockets[playerId].send(JSON.stringify({
          gameId, result: 'CANNOT_JOIN', game: games[gameId].game.ascii(), mutation: 'CANNOTJOIN',
        }));
      }
    }
    if (action === 'FETCH') {
      // create game if does not exist, join game if exists
      if (!games[gameId]) {
        console.log('creating new game: ', gameId);
        games[gameId] = { creator: playerId, game: new Chess() };
        webSockets[playerId].send(JSON.stringify({
          gameId, game: games[gameId], mutation: 'GAMECREATED',
        }));
      } else {
        console.log('fetching game: ', gameId);
        games[gameId] = { ...games[gameId], joiner: playerId };
        webSockets[playerId].send(JSON.stringify({
          gameId, result: 'JOINED', game: games[gameId], mutation: 'GAMECREATED',
        }));
        webSockets[games[gameId].creator].send(JSON.stringify({
          gameId, result: 'JOINED', game: games[gameId], mutation: 'GAMECREATED',
        }));
      }
    }
    if (action === 'MOVE') {
      const { game } = games[gameId];
      const moves = game.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      game.move(move);

      send(playerId);

    //   webSockets[game.joiner].send(JSON.stringify({
    //     gameId, game, mutation: 'MOVE',
    //   }));
    //   webSockets[game.creator].send(JSON.stringify({
    //     gameId, game, mutation: 'MOVE',
    //   }));
    }
  });

//   webSocket.on('close', () => {
//     console.log('close');
//     delete webSockets[playerId];
//     console.log(`deleted: ${playerId}`);
//   });
});
