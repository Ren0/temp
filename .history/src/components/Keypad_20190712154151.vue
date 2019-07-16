<template>
  <div>
    <div class="digits-display">
      <div v-for="(digit, index) in gameId" :key="index">
        <div class="digits-display-element">{{digit}}</div>
      </div>
    </div>
    <div class="keypad-container">
      <button type="button" value="1" class="digit-button" @click="press($event)">1</button>
      <button type="button" value="2" class="digit-button" @click="press($event)">2</button>
      <button type="button" value="3" class="digit-button" @click="press($event)">3</button>
      <button type="button" value="4" class="digit-button" @click="press($event)">4</button>
      <button type="button" value="5" class="digit-button" @click="press($event)">5</button>
      <button type="button" value="6" class="digit-button" @click="press($event)">6</button>
      <button type="button" value="7" class="digit-button" @click="press($event)">7</button>
      <button type="button" value="8" class="digit-button" @click="press($event)">8</button>
      <button type="button" value="9" class="digit-button" @click="press($event)">9</button>
      <button type="button" class="digit-button"></button>
      <button type="button" value="0" class="digit-button" @click="press($event)">0</button>
      <button type="button" class="digit-button">back</button>
      <button class="digit-button" @click="clear()">clear</button>
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
        console.log('JOIN');
      }
    },
    back() {

    },
    clear() {
      this.gameId = ['-', '-', '-', '-'];
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
