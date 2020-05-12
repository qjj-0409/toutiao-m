<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
    >
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 文章频道列表 -->
    <!--
      通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
    -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <!-- /文章频道列表 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  props: {},
  components: {},
  data () {
    return {
      active: 0 // 控制激活的标签
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.home-container {
  .app-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: none;
      .search-btn {
        width: 277px;
        height: 32px;
        background-color: #5babfb;
        border: none;
        color: #fff;
        .van-icon-search {
          font-size: 16px;
        }
        .van-button__text {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
