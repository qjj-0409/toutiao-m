<template>
  <div class="user-chat">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /顶部导航栏 -->
    <!-- 聊天内容区 -->
    <van-cell-group
      class="message-list-wrap"
      ref="message-list"
    >
      <van-cell
        v-for="(item, index) in messageList"
        :key="index"
        :title="item.msg"
      />
    </van-cell-group>
    <!-- /聊天内容区 -->
    <!-- 底部发消息区 -->
    <van-cell class="send-message-wrap">
      <van-field
        slot="title"
        v-model="message"
        placeholder="请输入消息"
      />
      <van-button
        slot="right-icon"
        type="primary"
        size="small"
        @click="onSend"
      >发布</van-button>
    </van-cell>
    <!-- /底部发消息区 -->
  </div>
</template>

<script>
// 导入socket.io-client
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  props: {},
  components: {},
  data () {
    return {
      message: '', // 输入框内容
      socket: null, // 全局定义socket连接，方便使用
      messageList: getItem('chat-messageList') || [] // 消息列表
    }
  },
  computed: {},
  watch: {
    // 监视消息列表数据的变化
    messageList () {
      setItem('chat-messageList', this.messageList)
      // 如果需要在操作数据之后立即操作数据影响的视图DOM，那么最好把代码放到nextTick函数中
      // 因为数据改变影响视图更新不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    // 连接成功
    socket.on('connect', () => {
      console.log('建立连接成功')
    })
    // 断开连接
    socket.on('disconnect', () => {
      console.log('断开连接')
    })
    // 监听message事件，接收服务端消息
    socket.on('message', data => {
      console.log('收到服务端消息', data)
      // 同样存放服务器返回的数据到消息列表中
      this.messageList.push(data)
    })
  },
  methods: {
    onSend () {
      const data = {
        msg: this.message, // 聊天输入内容，接口中定义的
        timestamp: new Date() // 聊天发送时间戳
      }
      this.socket.emit('message', data)
      // 存放用户发送的消息到消息列表中
      this.messageList.push(data)
      // 清空输入框
      this.message = ''
    },
    scrollToBottom () {
      // 1.给消息列表绑定ref属性
      // 2.获取消息列表的DOM元素
      const messages = this.$refs['message-list']
      // 3.给消息列表元素设置scrollTop属性值为可滚动的最大值
      messages.scrollTop = messages.scrollHeight
    }
  },
  mounted () {
    // 在页面一加载就要使消息列表滚动到底部
    this.scrollToBottom()
  }
}
</script>
<style lang='less' scoped>
.van-nav-bar {
  background-color: #3196FA;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
}
.message-list-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 64px;
    overflow-y: auto;
}
</style>
