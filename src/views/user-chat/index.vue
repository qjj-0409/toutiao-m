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
    <van-cell-group class="message-list-wrap">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
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
      >发布</van-button>
    </van-cell>
    <!-- /底部发消息区 -->
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  props: {},
  components: {},
  data () {
    return {
      message: '' // 输入框内容
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
