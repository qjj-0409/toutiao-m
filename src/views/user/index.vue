<template>
  <div class="user-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="user-nav"
      :title="user.name"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /顶部导航栏 -->
    <!-- 用户个人信息 -->
    <van-cell
      class="user-info"
    >
      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="user.photo"
      />
      <van-grid
        slot="title"
        :gutter="10"
        :border="false"
      >
        <van-grid-item>
          <span class="grid-count">{{user.art_count}}</span>
          <span class="grid-text">发布</span>
        </van-grid-item>
        <van-grid-item>
          <span class="grid-count">{{user.follow_count}}</span>
          <span class="grid-text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="grid-count">{{user.fans_count}}</span>
          <span class="grid-text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="grid-count">{{user.like_count}}</span>
          <span class="grid-text">获赞</span>
        </van-grid-item>
      </van-grid>
      <van-button
        class="focus-btn"
        slot="label"
        :type="user.is_following ? 'primary' : 'info'"
        @click="addFollow"
      >{{user.is_following ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <!-- /用户个人信息 -->
    <!-- 认证和简介 -->
    <van-cell-group class="user-style">
      <van-field
        v-if="user.is_media"
        :border="false"
        label="认证："
        :value="user.certi"
        readonly
      />
      <van-field
        :border="false"
        label="简介："
        :value="user.intro"
        readonly
      />
    </van-cell-group>
    <!-- /认证和简介 -->
    <!-- 用户文章列表 -->
    <article-list
      :user-id="userId"
      :photo="user.photo"
    />
    <!-- /用户文章列表 -->
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { getUserById, addUserFollow } from '@/api/user'

export default {
  name: 'UserIndex',
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    ArticleList
  },
  data () {
    return {
      user: {} // 用户相关信息
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      const { data } = await getUserById(this.userId)
      // console.log(data)
      this.user = data.data
    },
    async addFollow () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true // 禁止背景点击
      })
      await addUserFollow(this.userId)
      // 更新视图
      this.user.is_following = !this.user.is_following
      // 轻提示
      this.$toast.success(this.user.is_following ? '关注成功' : '取消关注')
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.user-nav {
  background-color: #3194ff;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
    font-size: 15px;
  }
}
.user-info {
  height: 120px;
  .avatar {
    width: 78px;
    height: 78px;
  }
}
.van-cell__label {
  text-align: center;
  .focus-btn {
    width: 144px;
    height: 27px;
    margin-top: 5px;
  }
}
/deep/ .van-grid-item__content {
  padding: 0;
}
.grid-count {
  font-size: 14px;
  color: #0d0a10;
}
.grid-text {
  font-size: 10px;
  color: #9c9b9d;
}
.user-style {
  margin: 6px 0;
}
/deep/ .van-field__label {
  color: #646263;
  font-size: 13px;
  width: 43px;
}
/deep/ .van-cell__value {
  color: #212121;
  font-size: 13px;
}
</style>
