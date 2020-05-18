<template>
  <div class="article-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      class="article-nav"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- /顶部导航栏 -->
    <!-- 标题 -->
    <h1 class="article-title">牛逼程序员都用的开源工具，你用了 几个？</h1>
    <!-- /标题 -->
    <van-cell center :border="false">
      <div slot="title">天涯小行客</div>
      <span slot="label">相对时间</span>
      <van-image
        class="avatar"
        slot="icon"
        round
        width="35"
        height="35"
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <van-button
        class="article-btn"
        round
        icon="plus"
        type="info"
        size="small"
      >关注</van-button>
    </van-cell>
    <div class="article-content markdown-body">
      <p>哈哈哈哈</p>
      <p>哈哈哈哈</p>
      <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
      </ul>
    </div>
  </div>
</template>

<script>
import './github-markdown.css'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
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
ul {
  list-style: unset;
}
.article-container {
  background-color: #fff;
}
.article-nav {
  background-color: #3296fa;
  /deep/ .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
}
.article-title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 15px;
}
.avatar {
  margin-right: 8px;
}
/deep/ .van-cell__title {
  color: #545454;
}
/deep/ .van-cell__label {
  color: #b4b4b4;
  margin-top: unset;
}
.article-btn {
  width: 85px;
  height: 29px;
  .van-button__text {
    font-size: 14px;
  }
}
</style>
