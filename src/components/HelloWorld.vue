<template>
  <div class="hello">
    <fs-header></fs-header>
  </div>
</template>

<script>
import fsHeader from './fs-header/fs-header.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    fsHeader
  }
}
</script>
