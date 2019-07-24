import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    game: {
      gameId: 0, fen: '', turn: 'w', chess: {}, white: '', black: '',
    },
  },
  getters: {
    fen: state => state.game.fen,
    turn: state => (state.game.turn === 'w' ? 'white' : 'black'),
    chess: state => state.game.chess,
    white: state => state.game.white,
    black: state => state.game.black,
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      console.log('ONOPEN', event.currentTarget);
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    SOCKET_ONMESSAGE(state, message) {
      console.log('ONMESSAGE', message);
      state.socket.message = message;
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    GAME_FETCHED(state, event) {
      console.log('GAME_FETCHED', event);
      state.game.gameId = event.gameId;
      state.game.fen = event.fen;
      state.game.turn = event.turn;
      state.game.chess = event.chess;
      state.game.white = event.white;
      state.game.black = event.black;
    },
    GAME_MOVE(state, event) {
      console.log('GAME_MOVE', event);
      state.game.gameId = event.gameId;
      state.game.fen = event.fen;
      state.game.turn = event.turn;
      state.game.chess = event.chess;
      state.game.white = event.white;
      state.game.black = event.black;
    },
  },
  actions: {
    createGame() {
      const playerId = localStorage.getItem('playerId');
      const gameId = Math.floor(1000 + Math.random() * 9000);
      const payload = { playerId, gameId, action: 'FETCH' };
      Vue.prototype.$socket.sendObj(payload);
      Vue.router.push(`${gameId}`);
    },
    fetchGame(store, gameId) {
      const playerId = localStorage.getItem('playerId');
      const message = {
        playerId, gameId: parseInt(gameId, 10), action: 'FETCH',
      };
      Vue.prototype.$socket.sendObj(message);
    },
    move({ state }, move) {
      const playerId = localStorage.getItem('playerId');
      const message = {
        playerId, gameId: state.game.gameId, action: 'MOVE', move,
      };
      Vue.prototype.$socket.sendObj(message);
    },
  },
});
