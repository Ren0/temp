import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';
import router from './router';
import './registerServiceWorker';

Vue.use(VueNativeSock, 'ws://localhost:9090', { store });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
