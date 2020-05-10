<template>
  <div class="my-container">
    <!-- 个人信息 -->
    <van-cell-group class="my-user">
      <van-cell class="my-userInfo" center>
        <van-image
          slot="icon"
          round
          fill="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span class="my-userName" slot="title">昵称</span>
        <van-button
          class="my-updateBtn"
          type="default"
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>
      <van-grid class="my-grid-data">
        <van-grid-item>
          <div slot="text">
            <div class="span">88</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="span">88</div>
          <div class="text">关注</div>
        </van-grid-item>
        <van-grid-item>
          <div class="span">88</div>
          <div class="text">粉丝</div>
        </van-grid-item>
        <van-grid-item>
          <div class="span">88</div>
          <div class="text">获赞</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- /个人信息 -->
    <!-- 收藏-历史 -->
    <van-grid :column-num="2">
      <van-grid-item
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
        to="/"
      />
      <van-grid-item
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
        to="/"
      />
    </van-grid>
    <!-- /收藏-历史 -->
    <!-- 消息通知 -->
    <van-cell
      title="消息通知"
      is-link
      to="/"
    />
    <!-- /消息通知 -->
    <!-- 小智同学 -->
    <van-cell
      title="小智同学"
      is-link
      to="/"
    />
    <!-- /小智同学 -->
    <!-- 退出登录 -->
    <van-cell
      class="my-logout"
      title="退出登录"
    />
    <!-- /退出登录 -->
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.my-container {
  .my-user {
    background: url(./banner.png) no-repeat;
    background-size: cover;
    .my-userInfo {
      height: 135px;
      background-color: transparent;
      .van-image {
        width: 65px;
        height: 65px;
      }
      .my-userName {
        font-size: 15px;
        margin-left: 10px;
        color: #fff;
      }
      .my-updateBtn {
        font-size: 10px;
        color: #666666;
        // background-color: #fff;
      }
    }
    .my-grid-data {
      .span {
        font-size: 18px;
      }
      .text {
        font-size: 11px;
      }
    }
  }
  .my-logout {
    text-align: center;
  }
}
</style>
