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
    <h1 class="article-title">{{article.title}}</h1>
    <!-- /标题 -->
    <van-cell center :border="false">
      <div slot="title">{{article.aut_name}}</div>
      <span slot="label">{{article.pubdate | relativeTime}}</span>
      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <van-button
        class="article-btn"
        round
        icon="plus"
        type="info"
        size="small"
      >关注</van-button>
    </van-cell>
    <div
      class="markdown-body"
      v-html="article.content"
    >
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Array, Object],
      required: true
    }
  },
  components: {},
  data () {
    return {
      article: {} // 文章详情对象
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onloadArticle()
  },
  methods: {
    // 加载文章详情
    async onloadArticle () {
      const { data } = await getArticleById(this.articleId)
      console.log(data)
      this.article = data.data
    }
  },
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
  padding: 24px 20px 18px;
}
.avatar {
  margin-right: 8px;
  width: 35px;
  height: 35px;
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
.markdown-body {
  padding: 14px;
}
</style>
