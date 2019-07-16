<template>
  <div>
    <div>Game id: {{this.gameId}}</div>
    <div>{{this.$store.state.game.ascii}}</div>
    <!-- <chessboard /> -->

    <button type="button" @click="move">Move</button>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard';
import 'vue-chessboard/dist/vue-chessboard.css';

export default {
  name: 'ChessBoard',
  props: {
    msg: String,
  },
  data() {
    return {
      gameId: this.$route.params.gameId,
    };
  },
  created() {
    if (this.$store.state.socket.isConnected) {
      this.$store.dispatch('fetchGame', this.gameId);
    }
    this.$store.watch(
      state => state.socket.isConnected,
      (newValue, oldValue) => {
        if (!oldValue && newValue) {
          this.$store.dispatch('fetchGame', this.gameId);
        }
      },
    );
  },
  components: { chessboard },
  methods: {
    move() {
      const playerId = localStorage.getItem('playerId');
      const message = {
        playerId, gameId: this.gameId, action: 'MOVE', move: 'e4',
      };
      console.log('Sending:', message);
      this.$socket.sendObj(message);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
