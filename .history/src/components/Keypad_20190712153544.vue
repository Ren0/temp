<template>
  <div>
    <div class="digits-display">
      <div v-for="(digit, index) in gameId" :key="index">
        <div class="digits-display-element">{{digit}}</div>
      </div>
      <!-- <div class="digits-display-element">x</div>
      <div class="digits-display-element">x</div>
      <div class="digits-display-element">x</div>
      <div class="digits-display-element">x</div>-->
    </div>
    <div class="keypad-container">
      <button type="button" value="1" class="digit-button" @click="press($event)">1</button>
      <button value="2" class="digit-button" @click="press($event)">2</button>
      <button value="2" class="digit-button" @click="clear()">clear</button>
      <!-- <div class="digit-button"></div>
      <div class="digit-button">0</div>
      <div class="digit-button"></div>-->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

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
    press(event) {
      const digit = event.target.value;
      if (this.gameId[0] === '-') {
        Vue.set(this.gameId, 0, digit);
      } else if (this.gameId[1] === '-') {
        Vue.set(this.gameId, 1, digit);
      } else if (this.gameId[2] === '-') {
        Vue.set(this.gameId, 2, digit);
      } else if (this.gameId[3] === '-') {
        Vue.set(this.gameId, 3, digit);
      } else {
        console.log('JOIN');
      }
    },
    clear() {},
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
