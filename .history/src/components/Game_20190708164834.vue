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
      // Emit the server side
      console.log(this.$socket);
      this.$socket.emit("changed", { a: 5, b: 3 });
    }
  },
  socket: {
    // Prefix for event names
    // prefix: "/counter/",

    // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
    // namespace: "/1234",

    events: {
      // Similar as this.$socket.on("changed", (msg) => { ... });
      // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
      //
      changed(msg) {
        console.log("Something changed: " + msg);
      },

      connect() {
        console.log("Websocket connected to " + this.$socket.nsp);
        // this.$socket.emit('room', '1234');
      },

      disconnect() {
        console.log("Websocket disconnected from " + this.$socket.nsp);
      },

      error(err) {
        console.error("Websocket error!", err);
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
