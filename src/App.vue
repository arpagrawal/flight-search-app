<template>
  <div id="app">
    <fs-header></fs-header>
    <div class="fs-content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import router from './router';
import i18n from './locale-config';
import FsHeader from './components/fs-header/fs-header.vue'

export default {
  name: 'App',
  components: {
    FsHeader,
  },
  router,
  i18n,
}
</script>

<style>
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
