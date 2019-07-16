<template>
  <div>
    <div>Game id: {{$route.params.gameId}}</div>
    <!-- <chessboard /> -->

    <button type="button" @click="move"></button>
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
  mounted() {
    console.log(this.$router);
    console.log(this.$route);
  },
  components: { chessboard },
  methods: {

  },
};
</script>

<style scoped lang="scss">
</style>
