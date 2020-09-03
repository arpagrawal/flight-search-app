import Vue from 'vue';
import Router from 'vue-router';
import FsSearch from './components/fs-search/fs-search.vue';

const routes = [
  { path: '/', component: FsSearch },
];

Vue.use(Router);

const router = new Router({
  routes,
});

export default router;