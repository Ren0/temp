import Vue from 'vue';
import Vuex from 'vuex';
import socket from '@/store/socket.module';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    socket,
  },
});
