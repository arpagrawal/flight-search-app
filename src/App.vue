<template>
  <div id="app">
    <fs-header></fs-header>
    <div class="fs-content-container">
      <router-view></router-view>
    </div>
    <fs-footer></fs-footer>
  </div>
</template>

<script>
import router from './router';
import i18n from './locale-config';
import FsHeader from './components/fs-header/fs-header.vue';
import FsFooter from './components/fs-footer/fs-footer.vue';

export default {
  name: 'App',
  components: {
    FsHeader,
    FsFooter,
  },
  router,
  i18n,
};
</script>

<style lang="less">
* {
  margin: 0;
}
body,
#app {
  font-family: 'Quicksand', sans-serif;
  background: #e1e7ee;
}

#app {
  min-height: 100vh;
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 80px;
}

a {
  text-decoration: none;
}
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 10px;
// }
</style>
