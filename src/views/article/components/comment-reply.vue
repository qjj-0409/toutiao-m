<template>
  <div class="comment-reply">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="`${replyComment.reply_count}条回复`"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- /顶部导航栏 -->
    <div class="reply-wrap">
      <!-- 被回复的评论项 -->
      <comment-item
        :comment="replyComment"
      />
      <!-- /被回复的评论项 -->
      <!-- 回复列表 -->
      <comment-list
        :list="replyList"
        :source="replyComment.com_id"
        type="c"
        @comment-total-count="replyCount = $event"
      />
      <!-- 回复列表 -->
    </div>
    <!-- 底部写评论 -->
    <div class="reply-bottom">
      <van-button
        class="bottom-btn"
        type="default"
        round
        @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <!-- /底部写评论 -->
    <!-- 评论弹出框 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <comment-post
        :target="replyComment.com_id"
        :article-id="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- /评论弹出框 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'

export default {
  name: 'CommentReply',
  props: {
    // 当前回复评论对象
    replyComment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      isPostShow: false, // 控制发布回复的弹出框
      replyList: [], // 回复列表
      replyCount: 0 // 评论回复数
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onPostSuccess (replyComment) {
      // replyComment是对当前评论项的回复
      // 发布回复成功，将回复追加到当前评论回复列表的前面
      this.replyList.unshift(replyComment)
      this.replyCount++
      // 更新视图中的回复数量
      this.replyComment.reply_count = this.replyCount
      // 关闭弹出层
      this.isPostShow = false
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.reply-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 44px;
  border-top: 2px solid #ECECEC;
  background-color: #fff;
  text-align: center;
  .bottom-btn {
    width: 225px;
    height: 30px;
  }
}
.reply-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 112px;
  bottom: 46px;
  overflow-y: auto;
}
</style>
