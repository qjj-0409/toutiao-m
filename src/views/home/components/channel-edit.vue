<template>
  <div class="channel-edit">
    <!-- 我的频道模块 -->
    <van-cell :border="false">
      <div
        class="channel-title"
        slot="title"
      >我的频道</div>
      <van-button
        class="channel-btn"
        type="danger"
        size="mini"
        round
        plain
        @click="isEditShow = !isEditShow"
      >{{isEditShow ? '完成': '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :icon="isEditShow ? 'close' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name" />
    </van-grid>
    <!-- /我的频道模块 -->
    <!-- 推荐频道模块 -->
    <van-cell
      :border="false"
    >
      <div
        class="channel-title"
        slot="title"
      >推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(recomChannel, index) in recommendChannels"
        :key="index"
        :text="recomChannel.name"
      />
    </van-grid>
    <!-- /推荐频道模块 -->
  </div>
</template>

<script>
import { getAllChannles } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      isEditShow: false, // 控制编辑图标的显示和隐藏
      allChannels: [] // 所有的频道列表
    }
  },
  computed: {
    // 推荐的频道列表
    recommendChannels () {
      // 思路：所有频道 - 我的频道 = 剩余推荐频道
      // filter方法：遍历数组的同时筛选符合条件的值，返回一个新的数组
      // find方法：返回数组中符合条件的第一个元素的值
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannels => {
          return userChannels.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannles()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.channel-edit {
  padding-top: 54px;
  // 编辑标题
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  // 编辑按钮
  .channel-btn {
    font-size: 14px;
  }
  // 频道列表
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      border-radius: 3px;
    }
    /deep/ .van-grid-item__content::after {
      border: 0;
    }
    /deep/ .van-icon-close {
      position: absolute;
      top: -8px;
      right: -7px;
      font-size: 20px;
      color: #bbb;
    }
    /deep/ .van-grid-item__text {
      margin-top: 0;
      font-size: 14px;
      color: #222222;
    }
  }
  .van-cell {
    padding-top: 20px;
    padding-bottom: 15px;
  }
}
</style>
