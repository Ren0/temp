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
export default {
  name: 'Game',
  props: {
    msg: String,
  },

};
</script>

<style scoped lang="scss">
</style>
