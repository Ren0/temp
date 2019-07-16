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
    },
  },
};
</script>

<style scoped lang="scss">
</style>
