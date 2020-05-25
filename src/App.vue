<template>
  <div id="app">
    <keep-alive :include="cachePages">
      <!--
        一级路由的出口
        keep-alive仅对该路由出口渲染的组件有效
      -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
.box {
  width: 200px;
  height: 100px;
  background-color: pink;
}
</style>
