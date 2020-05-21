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
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
    >
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
      @click="isEditGenderShow = true"
    />
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
      @click="isEditBirthdayShow = true"
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
    <!-- 性别弹出层 -->
    <van-popup
      class="update-gender-popup"
      v-model="isEditGenderShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <update-gender
        v-if="isEditGenderShow"
        v-model="userProfile.gender"
        @close="isEditGenderShow = false"
      />
    </van-popup>
    <!-- /性别弹出层 -->
    <!-- 生日弹出层 -->
    <van-popup
      class="update-birthday-popup"
      v-model="isEditBirthdayShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="userProfile.birthday"
        @close="isEditBirthdayShow = false"
      />
    </van-popup>
    <!-- /生日弹出层 -->
    <!-- 头像弹出层 -->
    <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        :image="previewImage"
      />
    </van-popup>
    <!-- /头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  name: 'UserProfile',
  props: {},
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      userProfile: {}, // 用户资料
      isEditNameShow: false, // 控制编辑昵称弹出层的显示/隐藏
      isEditGenderShow: false, // 控制编辑性别弹出层的显示/隐藏
      isEditBirthdayShow: false, // 控制编辑性别弹出层的显示/隐藏
      isEditPhotoShow: false, // 控制编辑头像弹出层的显示/隐藏
      previewImage: null // 上传预览图片
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
    },
    onFileChange () {
      // 在弹出层里面预览图片
      const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      this.previewImage = blob
      // 展示弹出层
      this.isEditPhotoShow = true
      // 为了解决相同文件不触发change事件，所以手动清空file的value
      this.$refs.file.value = ''
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
