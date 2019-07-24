import Vue from 'vue';
import Router from 'vue-router';
import CurrentGame from './views/CurrentGame.vue';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        name: 'home',
      },
    },
    {
      path: '/:gameId',
      name: 'game',
      component: CurrentGame,
      meta: {
        name: 'game',
      },
    },
  ],
});

Vue.router = router;

export default router;
