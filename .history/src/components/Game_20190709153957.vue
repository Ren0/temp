<template>
  <div>
    <div>{{msg}}</div>
    <input value="1234"/>
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
      gameid: '1234'
    }
  }
  methods: {
    send() {
      console.log(this.$socket);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
