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
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list
          class="article-list"
          :channel="channel"
        ></article-list>
      </van-tab>
    </van-tabs>
    <!-- /文章频道列表 -->
  </div>
</template>

<script>
// 导入用户相关api
import { getUserChannels } from '@/api/user'
// 导入子组件
import ArticleList from './components/article-list'

export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0, // 控制激活的标签
      channels: [] // 文章频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      console.log(data)
      this.channels = data.data.channels
    }
  },
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
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
}
</style>
