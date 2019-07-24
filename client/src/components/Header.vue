<template>
  <div class="header">
    <a href="#default" class="logo">C</a>
    <div class="header-right">
      <!-- <a class="active" href="#home">Home</a>
      <a href="#contact">Contact</a>-->
      <!-- <a href="#contact">Contact</a> -->
      <!-- <h1 v-if="$route.meta.name === 'home'">Home</h1>
      <h1 v-else-if="$route.meta.name === 'game'">Game</h1> -->
      <h1 v-if="$route.meta.name === 'home'">Home</h1>
      <router-link to="/" v-if="$route.meta.name === 'game'">Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  components: {},
};
</script>


<style lang="scss">
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}
.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}
.header a.logo {
  font-size: 25px;
  font-weight: bold;
}
.header a:hover {
  background-color: #ddd;
  color: black;
}
.header a.active {
  background-color: dodgerblue;
  color: white;
}
.header-right {
  float: right;
}
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
</style>
