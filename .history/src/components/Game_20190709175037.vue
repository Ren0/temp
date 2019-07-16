<template>
  <div>
    <div>{{msg}}</div>
    <input v-model="gameId"/>
    <button @click="create">Create</button>
    <button @click="join">Join</button>
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
      gameId: '1234',
    };
  },
  mounted() {
    console.log(this.$connect);
  },
  methods: {
    create() {
      const userId = uuid.v4();
      const message = { userId, gameId: this.gameId };
      console.log(message);
      this.$socket.sendObj(message);
    },
    join() {

    },
  },
};
</script>

<style scoped lang="scss">
</style>
