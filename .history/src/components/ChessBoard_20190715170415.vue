<template>
  <div>
    <div>Game id: {{$route.params.gameId}}</div>
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
      gameId: $route.params.gameId,
    };
  },
  mounted() {
    console.log(this.$router);
    console.log(this.$route);
  },
  components: { chessboard },
  methods: {
    move() {
      console.log(324);
      const playerId = localStorage.getItem('playerId');
      const message = { playerId, gameId: this.gameId, action: 'MOVE' };
      console.log('Sending:', message);
      this.$socket.sendObj(message);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
