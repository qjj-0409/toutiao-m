<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录/注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-from"
      validate-first
      @submit="onlogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-button
            class="send-btn"
            size="mini"
            round
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
        >登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3578]\d{9}$/, message: '请输入正确的手机号码格式' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onlogin () {
      // 展示加载提示
      Toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
      } catch (error) {
        Toast.fail('登录失败')
      }
    },
    // 表单验证失败触发的函数
    onFailed (error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码函数
    async onSendSms () {
      try {
        // 验证手机号码
        await this.$refs['login-from'].validate('mobile')
      } catch (err) {
        Toast({
          message: err.message,
          position: 'top'
        })
      }
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      color: #666666;
      font-size: 11px;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    background-color: #f5f7f9;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
