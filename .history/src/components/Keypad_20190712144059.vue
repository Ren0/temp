<template>
  <div class='container'>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
      <div class='item'>1</div>
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
    display: grid;
}
</style>
