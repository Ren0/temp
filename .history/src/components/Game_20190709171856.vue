<template>
  <div>
    <div>{{msg}}</div>
    <input v-model="gameId"/>
    <button @click="send">XXXX</button>
  </div>
</template>

<script>
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
      this.$socket.send({});
    },


    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0; const
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
