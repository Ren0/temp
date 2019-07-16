<template>
  <div>
    <div class="digits-display">
      <div class="digits-display-element">x</div>
      <div class="digits-display-element">x</div>
      <div class="digits-display-element">x</div>
      <div class="digits-display-element">x</div>
    </div>
    <div class="keypad-container">
      <div class="digit-button" @click="press($event)">1</div>
      <div class="digit-button">2</div>
      <div class="digit-button">3</div>
      <div class="digit-button">4</div>
      <div class="digit-button">5</div>
      <div class="digit-button">6</div>
      <div class="digit-button">7</div>
      <div class="digit-button">8</div>
      <div class="digit-button">9</div>
      <div class="digit-button"></div>
      <div class="digit-button">0</div>
      <div class="digit-button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keypad',
  props: {
    msg: String,
  },
  data() {
    return {
      gameId: ['-', '-', '-', '-'],
    };
  },
  methods: {
    press(digit) {
      console.log(digit.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.digits-display {
  display: flex;
  width: 20%;
}
.digits-display-element {
  width: 20%;
  height: 20%;
}
.keypad-container {
  width: 20%;
  height: 20%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
.digit-button {
  width: 20px;
  height: 20px;
  background: #ede7f6;
  padding: 1.5rem;
  border-radius: 1rem;
}
</style>
