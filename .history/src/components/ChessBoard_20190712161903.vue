<template>
  <div>
    <!-- <chessboard /> -->
    <!-- BLOO {{this.$router}} -->
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
};
</script>

<style scoped lang="scss">
</style>
