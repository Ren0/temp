<template>
  <div>
    <div>{{msg}}</div>
    <input v-model="gameId"/>
    <button @click="create">Create</button>
    <button @click="join">Join</button>
    <div>Conneced: {{isConnected}}</div>
    <div id="board1" style="width: 400px"></div>
  </div>
</template>

<script>
import uuid from 'uuid';

export default {
  name: 'Game',
  props: {
    msg: String,
  },
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

    let board1 = Chessboard('board1', 'start');
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
</style>
