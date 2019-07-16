<template>
  <div>
    <div>{{msg}}</div>
    <input v-model="gameId"/>
    <button @click="send">XXXX</button>
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
    send() {
      console.log(this.$socket);
      // this.$socket.send([this.gameId, 'testo']);
      console.log(uuid.v4());
      const userId = uuid.v4();
      this.$socket.send({ userId, gameId });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
