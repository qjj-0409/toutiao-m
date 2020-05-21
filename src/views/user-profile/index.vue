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
        :src="userProfile.photo"
      />
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="isEditNameShow = true"
    />
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender === 0 ? '男' : '女'"
    />
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
    />
    <!-- /个人信息展示 -->
    <!-- 昵称弹出层 -->
    <van-popup
      class="update-name-popup"
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--
        v-model="userProfile.name"
        是对以下代码的优化：
        :name="userProfile.name"
        @update-name="userProfile.name = $event"
        相当于：
        :value="userProfile.name"
        @input="userProfile.name = $event"
      -->
      <update-name
        v-if="isEditNameShow"
        v-model="userProfile.name"
        @close="isEditNameShow = false"
      />
    </van-popup>
    <!-- /昵称弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'

export default {
  name: 'UserProfile',
  props: {},
  components: {
    UpdateName
  },
  data () {
    return {
      userProfile: {}, // 用户资料
      isEditNameShow: false // 控制编辑昵称弹出层的显示/隐藏
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      console.log(data)
      this.userProfile = data.data
    }
  },
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
.update-name-popup {
  background-color: #F5F7F9;
}
</style>
