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
    <!-- 文章相关信息 -->
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
        :loading="isFollowLoading"
        :icon="article.is_followed ? '' : 'plus'"
        :type="article.is_followed ? 'default' : 'info'"
        size="small"
        @click="onFollow"
      >{{article.is_followed ? '取消关注' : '关注'}}</van-button>
    </van-cell>
    <!-- /文章相关信息 -->
    <!-- 文章内容 -->
    <div
      class="markdown-body"
      v-html="article.content"
      ref="article-content"
    >
    </div>
    <!-- /文章内容 -->
    <!-- 相关操作 -->

    <!-- /相关操作 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, delFollow } from '@/api/user'

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
      article: {}, // 文章详情对象
      isFollowLoading: false // 控制关注的loading
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
      // 图片预览
      // 数据改变影响视图更新（DOM不是立即的）
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
    },
    // 图片预览
    handlePreviewImage () {
      // 1.获取文章内容的DOM容器
      const articleContent = this.$refs['article-content']
      // 2.得到所有的img标签
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs) 控制台打印结果：NodeList[]
      // 原因是：数据改变影响视图更新（DOM数据）不是立即的，如果需要在修改数据之后，马上操作该数据影响的视图DOM，需要把这个代码放到$nextTick()中
      // $nextTick()是Vue提供的一个方法

      // 3.循环img列表，给img注册点击事件（记录每一张图片的路径，放在一个数组中）
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          // 4.在事件处理函数中调用ImagePreview()预览
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
    },
    // 关注用户
    async onFollow () {
      // 开启loading
      this.isFollowLoading = true
      // 判断用户当前的关注状态
      if (this.article.is_followed) {
        // 如果已关注，则取消关注
        await delFollow(this.article.aut_id)
      } else {
        // 如果未关注，则关注
        await addFollow(this.article.aut_id)
      }
      // 更新视图
      this.article.is_followed = !this.article.is_followed
      // 关闭loading
      this.isFollowLoading = false
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
