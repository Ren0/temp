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
  methods: {
    create() {
      const userId = uuid.v4();
      const message = { userId, gameId: this.gameId };
      this.$socket.send({ userId, gameId: this.gameId });
    },
    join() {

    },
  },
};
</script>

<style scoped lang="scss">
</style>
