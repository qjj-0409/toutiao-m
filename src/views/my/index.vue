<template>
  <div class="my-container">
    <!-- 个人信息 -->
    <!-- 登录时 -->
    <van-cell-group v-if="user" class="my-user">
      <van-cell
        class="my-userInfo"
        center
        :border="false"
      >
        <van-image
          slot="icon"
          class="avatar"
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
      <van-grid
        class="my-grid-data"
        :border="false"
      >
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">883</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">883</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">883</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">883</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录时 -->
    <div v-else class="not-login">
      <div @click="$router.push('login')">
        <img class="mobile" src="./手机.png" alt="">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- /个人信息 -->
    <!-- 收藏-历史 -->
    <van-grid class="my-grid mb-4" :column-num="2">
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
      class="mb-4"
      title="小智同学"
      is-link
      to="/"
    />
    <!-- /小智同学 -->
    <!-- 退出登录 -->
    <van-cell
      v-if="user"
      class="my-logout"
      title="退出登录"
    />
    <!-- /退出登录 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.my-container {
  .not-login {
    height: 180px;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  .my-user {
    background: url(./banner.png) no-repeat;
    background-size: cover;
    .my-userInfo {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      .avatar {
        box-sizing: border-box;
        border: 1px solid #fff;
        width: 66px;
        height: 66px;
      }
      .my-userName {
        font-size: 15px;
        margin-left: 10px;
        color: #fff;
      }
      .my-updateBtn {
        font-size: 10px;
        color: #666666;
      }
    }
    .my-grid-data {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
            color: #fff;
          }
          .text {
            font-size: 11px;
            color: #fff;
          }
        }
      }
      /deep/ .van-grid-item__content {
        background-color: unset;
      }
    }
  }
  /deep/ .my-grid {
    .van-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .mb-4 {
    margin-bottom: 4px;
  }
  .my-logout {
    text-align: center;
    color: #d86262;
  }
}
</style>
