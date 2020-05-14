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
        :class="{active: index === active}"
        :icon="(isEditShow && index !== 0) ? 'close' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(index)"
      />
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
        @click="onAdd(recomChannel)"
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
    userChannels: { // 用户频道
      type: Array,
      required: true
    },
    active: { // 被激活频道索引
      type: Number,
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
    // 加载所有频道函数
    async loadAllChannels () {
      const { data } = await getAllChannles()
      console.log(data)
      this.allChannels = data.data.channels
    },
    // 添加频道函数
    onAdd (recomChannel) {
      // 添加推荐频道到我的频道
      this.userChannels.push(recomChannel)

      // 数据持久化
    },
    // 点击我的频道触发的函数
    onUserChannelClick (index) {
      if (this.isEditShow) {
        // 编辑状态，删除点击的频道
        this.deleteChannel(index)
      } else {
        // 非编辑状态，切换首页的频道
        this.switchChannel(index)
      }
    },
    // 删除频道函数
    deleteChannel (index) {
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      // splice(index,length)：从指定索引index位置开始删除一个元素，不指定length默认删除从index开始的所有元素
      this.userChannels.splice(index, 1)

      // 数据持久化
    },
    // 切换频道函数
    switchChannel (index) {
      // 子传父，通过自定义事件的方式，将当前点击的频道激活
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
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
  // 被激活频道样式
  .active {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
}
</style>
