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
    <div class="article-wrap">
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
      <!-- 评论模块 -->
      <comment-list
        :source="articleId"
        :list="commentList"
      />
      <!-- /评论模块 -->
    </div>
    <!-- 相关操作 -->
    <div class="article-bottom">
      <van-button
        class="bottom-btn"
        type="default"
        round
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'pink' : '#777777'"
        @click="onLike"
      />
      <van-icon
        name="comment-o"
        color="#777777"
      />
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : '#777777'"
        @click="onCollect"
      />
      <van-icon
        name="share"
        color="#777777"
      />
    </div>
    <!-- /相关操作 -->
    <!-- 评论弹出层 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <comment-post
        :target="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- /评论弹出层 -->
  </div>
</template>

<script>
import './github-markdown.css'
import {
  getArticleById,
  addCollect,
  delCollect,
  addLike,
  delLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, delFollow } from '@/api/user'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentList,
    CommentPost
  },
  data () {
    return {
      article: {}, // 文章详情对象
      isFollowLoading: false, // 控制关注的loading
      isPostShow: false, // 控制评论弹出层的显示
      commentList: [] // 文章评论列表
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
      // console.log(data)
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
    },
    // 收藏文章
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.is_collected) {
        // 如果已收藏，取消收藏
        await delCollect(this.articleId)
      } else {
        // 如果未收藏，收藏
        await addCollect(this.articleId)
      }
      // 更新视图
      this.article.is_collected = !this.article.is_collected
      // toast提醒
      this.$toast.success(this.article.is_collected ? '收藏成功' : '取消收藏成功')
    },
    // 点赞文章
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 已点赞，则取消点赞
        await delLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 未点赞，则点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(this.article.attitude === 1 ? '点赞成功' : '取消点赞成功')
    },
    // 发表评论成功
    onPostSuccess (newComment) {
      // 关闭弹出层
      this.isPostShow = false
      // 添加最新评论到评论列表中
      this.commentList.unshift(newComment)
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
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 45px;
    overflow-y: auto;
  }
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
  background-color: #fff;
  margin: 0;
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
  background-color: #fff;
}
// 相关操作
.article-bottom {
  height: 44px;
  border-top: 1px solid #d8d8d8;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bottom-btn {
    width: 140px;
    height: 22px;
    /deep/ .van-button__text {
      text-align: unset;
      font-size: 15px;
      color: #a7a7a7;
    }
  }
}
</style>
