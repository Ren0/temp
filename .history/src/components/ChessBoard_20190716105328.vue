<template>
  <div>
    <div>Game id: {{this.gameId}}</div>
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
  mounted() {
    // this.$store.dispatch('fetchGame', this.gameId);
  },
  created() {
    this.$store.watch(
      state => state.isConnected, // could also put a Getter here
      (newValue, oldValue) => {
        // something changed do something
        console.log(oldValue);
        console.log(newValue);
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
