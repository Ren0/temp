<template>
  <div>
    <div>{{msg}}</div>
    <button @click="send">XXXX</button>
  </div>
</template>

<script>
export default {
  name: "Game",
  props: {
    msg: String
  },
  methods: {
    send() {
        console.log(this.$socket)

    }
  }
};
</script>

<style scoped lang="scss">
</style>
