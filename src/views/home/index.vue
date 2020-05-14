<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
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
    <!-- /顶部导航栏 -->
    <!-- 文章频道列表 -->
    <!--
      通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
    -->
    <van-tabs
      v-model="active"
      line-height="3"
      line-width="15"
      color="#3296fa"
      class="channels-tabs"
    >
      <div class="tabs-placeholder" slot="nav-right"></div>
      <div
        class="tabs-right"
        slot="nav-right"
        @click="isPopupShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list
          :channel="channel"
        ></article-list>
      </van-tab>
    </van-tabs>
    <!-- /文章频道列表 -->

    <!-- 弹出层 -->
    <van-popup
      v-model="isPopupShow"
      get-container="body"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :user-channels="channels"
        :active="active"
        @close="isPopupShow = false"
        @update-active="active = $event"
      ></channel-edit>
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
// 导入用户相关api
import { getUserChannels } from '@/api/user'
// 导入子组件
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
// 导入vuex中的state数据
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制激活的标签的索引
      channels: [], // 文章频道列表
      isPopupShow: false // 控制是否显示弹出层
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      let channels = []
      if (this.user) {
        // 如果登录了，请求获取线上的用户频道列表数据
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 如果没有登录，判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')
        if (localChannels) {
          // 如果有本地存储频道列表，则使用本地存储的频道列表数据
          channels = localChannels
        } else {
          // 如果没有本地存储频道列表，则使用接口定义的给匿名用户展示的频道列表数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      // 把处理好的数据放到data中以供模板使用
      this.channels = channels
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
  .channels-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
    }
    .tabs-placeholder {
      width: 33px;
      flex-shrink: 0;
      border-bottom: 1px solid #edeff3;
    }
    .tabs-right {
      position: fixed;
      right: 0;
      background-color: rgba(255,255,255,.9);
      height: 42px;
      width: 33px;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 29px;
        background: url(./line.png) no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
