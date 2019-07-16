<template>
  <div>
    <div>{{msg}}</div>
    <input v-model="gameId"/>
    <button @click="create">Create</button>
    <button @click="join">Join</button>
    <div>Conneced: {{isConnected}}</div>
    <!-- <chessboard /> -->
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

};
</script>

<style scoped lang="scss">
</style>
