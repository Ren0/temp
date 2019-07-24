import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import uuid from 'uuid';
import App from './App.vue';
import store from './store/store';
import router from './router';
import './registerServiceWorker';

Notification.requestPermission();

if (!localStorage.getItem('playerId')) {
  localStorage.setItem('playerId', uuid.v4());
}
Vue.use(VueNativeSock, `ws://${process.env.VUE_APP_HOST}/${localStorage.getItem('playerId')}`, { store, connectManually: false, format: 'json' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
