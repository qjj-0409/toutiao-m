<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <!-- layout的子路由出口，或者说是二级路由 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部tabbar栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon-prefix="toutiao" icon="shouye">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon-prefix="toutiao" icon="wenda">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon-prefix="toutiao" icon="shipin">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon-prefix="toutiao" icon="wode">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部tabbar栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  props: {},
  components: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  }
}
</script>
<style lang='less' scoped>
</style>
