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
      <!-- <button type="button" class="digit-button">back</button> -->
      <button class="digit-button" @click="clear()">C</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'keypad',
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
        this.$router.push(this.gameId.join(''));
      }
    },
    back() {},
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
  width: 300px;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
.digit-button {
  height: 60px;
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #c4c4c4;
  background-color: transparent;
  font-size: 2rem;
  color: #333;
  background-image: linear-gradient(
    to bottom,
    transparent,
    transparent 50%,
    rgba(0, 0, 0, 0.04)
  );
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.15),
    0 1px 0 0 rgba(255, 255, 255, 0.15);
  text-shadow: 0 1px rgba(255, 255, 255, 0.4);
}
.digit-button:hover {
  background-color: #eaeaea;
}
</style>
