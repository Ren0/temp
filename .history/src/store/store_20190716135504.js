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
    game: {},
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      console.log('ONOPEN', event.currentTarget);
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      console.log('ONMESSAGE', message);
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    GAME_CREATED(state, event) {
      console.log('GAME_CREATED', event);
      state.game = event.chess;
    },
    GAME_FETCHED(state, event) {
      console.log('GAME_FETCHED', event.chess);
      state.game = event.chess;
    },
    GAME_MOVE(state, event) {
      console.log(event);
      state.game.ascii = event.chess;
    },
  },
  actions: {
    fetchGame({ commit }, gameId) {
      const playerId = localStorage.getItem('playerId');
      const message = {
        playerId, gameId, action: 'FETCH',
      };
      console.log('Sending:', message);
      Vue.prototype.$socket.sendObj(message);
    },
  },
});
