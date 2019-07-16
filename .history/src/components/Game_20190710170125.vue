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
    this.$connect(`ws://localhost:3000/${this.gameId}`);
    const { onMessage } = this;
    this.$options.sockets.onmessage = data => onMessage(data);
    // this.$options.sockets.onmessage = this.onMessage;
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
    onMessage(data) {
      console.log('received:', data);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
