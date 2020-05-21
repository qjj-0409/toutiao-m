<template>
  <div class="user-profile">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /顶部导航栏 -->
    <!-- 个人信息展示 -->
    <!-- 头像 -->
    <van-cell title="头像" is-link>
      <van-image
        class="user-photo"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      value="内容"
    />
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      value="内容"
    />
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      value="内容"
    />
    <!-- /个人信息展示 -->
  </div>
</template>

<script>
// import { getUserProfile } from '@/api/user'

export default {
  name: 'UserProfile',
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
.van-nav-bar {
  background-color: #3196FA;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
.user-photo {
  width: 30px;
  height: 30px;
}
</style>
