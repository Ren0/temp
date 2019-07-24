<template>
  <div>
    <button @click="create">Create</button>
    <div>Connected: {{isConnected}}</div>
    <Keypad/>
  </div>
</template>

<script>
import Keypad from '@/components/Keypad.vue';

export default {
  name: 'game',
  components: { Keypad },
  computed: {
    isConnected() {
      return this.$store.state.socket.isConnected;
    },
  },
  methods: {
    create() {
      this.$store.dispatch('createGame');
    },
  },
};
</script>

<style scoped lang="scss">
</style>
