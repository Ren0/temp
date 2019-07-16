<template>
  <div>
    <div>{{msg}}</div>
    <input v-model="gameId"/>
    <button @click="create">Create</button>
    <button @click="join">Join</button>
    <div>Conneced: {{isConnected}}</div>
    <chessboard />
  </div>
</template>

<script>
import uuid from 'uuid';
import { chessboard } from 'vue-chessboard';
import 'vue-chessboard/dist/vue-chessboard.css';

export default {
  name: 'Game',
  props: {
    msg: String,
  },
  components: { chessboard },
  data() {
    return {
      // gameId: '1234',
      gameId: Math.floor(1000 + Math.random() * 9000),
    };
  },
  computed: {
    isConnected() {
      return this.$store.state.socket.isConnected;
    },
  },
  mounted() {
    if (!localStorage.getItem('playerId')) {
      localStorage.setItem('playerId', uuid.v4());
    }
    console.log(localStorage.getItem('playerId'));
    this.$connect(`ws://localhost:3000/${localStorage.getItem('playerId')}`);
    this.$options.sockets.onmessage = this.onMessage;
  },
  methods: {
    create() {
      const playerId = localStorage.getItem('playerId');
      const message = { playerId, gameId: this.gameId, action: 'CREATE' };
      console.log('Sending:', message);
      this.$socket.sendObj(message);
    },
    join() {
      const playerId = localStorage.getItem('playerId');
      const message = { playerId, gameId: this.gameId, action: 'JOIN' };
      console.log('Sending:', message);
      this.$socket.sendObj(message);
    },
    onMessage(data) {
      console.log('Receiving:', data);
      const parsedData = JSON.parse(data.data);
      console.log(parsedData.game);
    },
  },
};
</script>

<style scoped lang="scss">
// #chessBoard {
//   background-color: aquamarine
// }
</style>
