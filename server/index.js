const ws = require('ws');
const { Chess } = require('./node_modules/chess.js');

const webSocketServer = new (ws).Server({ port: 3000 });

const webSockets = {};
const games = {};

const send = (playerId, payload) => {
    if (webSockets[playerId]) {
        webSockets[playerId].send(JSON.stringify(payload));
    }
};

webSocketServer.on('connection', (webSocket, request) => {
    const playerId = request.url.substr(1, request.url.length - 1);
    webSockets[playerId] = webSocket;

    webSocket.on('message', (message) => {
        const jsonMessage = JSON.parse(message);
        console.log(jsonMessage);
        const { action, gameId } = jsonMessage;

        if (action === 'FETCH') {
            // create game if does not exist, join game if exists
            if (!games[gameId]) {
                console.log('creating new game: ', gameId);
                const white = Math.random() < 0.5 ? playerId : '';
                const black = white === '' ? playerId : '';
                games[gameId] = { creator: playerId, chess: new Chess(), white, black };
                const payload = { gameId, fen: games[gameId].chess.fen(), turn: games[gameId].chess.turn(), chess: games[gameId].chess, white: games[gameId].white, black: games[gameId].black, mutation: 'GAME_FETCHED' };
                send(playerId, payload);
            } else {
                console.log('fetching game: ', gameId);
                const joiner = games[gameId].joiner ? games[gameId].joiner : playerId !== games[gameId].creator ? playerId : ''; 
                if(games[gameId].white === '') {
                    games[gameId] = { ...games[gameId], white: joiner }    
                }
                if(games[gameId].black === '') {
                    games[gameId] = { ...games[gameId], black: joiner }    
                }
                games[gameId] = { ...games[gameId], joiner };
                console.log('creator - joiner', games[gameId].creator, games[gameId].joiner);
                console.log('white', games[gameId].white);
                console.log('black', games[gameId].black);
                const payload = { gameId, fen: games[gameId].chess.fen(), turn: games[gameId].chess.turn(), chess: games[gameId].chess, white: games[gameId].white, black: games[gameId].black, mutation: 'GAME_FETCHED' };
                
                send(playerId, payload);
                send(games[gameId].creator, payload);
            }
        }
        if (action === 'MOVE') {
            console.log('move: ', gameId);
            const { chess, creator, joiner, white, black } = games[gameId];
            const move = jsonMessage.move;
            chess.move(move);

            const payload = { gameId, fen: chess.fen(), turn: chess.turn(), chess, white, black, mutation: 'GAME_MOVE' };
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
