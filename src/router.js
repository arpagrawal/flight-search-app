import Vue from 'vue';
import Router from 'vue-router';
import FsHome from './components/fs-home/fs-home.vue';

const routes = [
  { path: '/', component: FsHome },
];

Vue.use(Router);

const router = new Router({
  routes,
});

export default router;