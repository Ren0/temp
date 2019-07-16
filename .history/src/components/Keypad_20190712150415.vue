<template>
<div class="number-display">
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
    <div class="item"></div>
    <div class="item">0</div>
    <div class="item"></div>
  </div>
</template>

<script>
export default {
  name: 'Keypad',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 20%;
  height: 20%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
.item {
  width: 20px;
  height: 20px;
  background: #ede7f6;
  padding: 1.5rem;
  border-radius: 1rem;
}
</style>
