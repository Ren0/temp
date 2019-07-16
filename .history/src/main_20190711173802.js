import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import store from './store'
Vue.use(VueNativeSock, 'ws://localhost:9090', { store: store })
Vue.use(VueNativeSock, 'ws://localhost:3000', { connectManually: true, format: 'json' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
