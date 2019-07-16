import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import uuid from 'uuid';
import App from './App.vue';
import store from './store/store';
import router from './router';
import './registerServiceWorker';

if (!localStorage.getItem('playerId')) {
  localStorage.setItem('playerId', uuid.v4());
}
this.$connect(`ws://localhost:3000/${localStorage.getItem('playerId')}`);
this.$options.sockets.onmessage = this.onMessage;

Vue.use(VueNativeSock, `ws://localhost:3000/${localStorage.getItem('playerId')}`, { store, connectManually: false, format: 'json' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
