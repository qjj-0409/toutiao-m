<template>
  <div class="comment-item">
    <van-cell
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          fit="cover"
          round
          :src="comment.aut_photo"
        />
        <div slot="title">
          <div class="title-wrap">
            <div class="title-autName"
            >{{comment.aut_name}}</div>
            <div
              class="title-like"
              @click="onLike"
            >
              <van-icon
                class="title-icon"
                :class="{liked: comment.is_liking}"
                :name="comment.is_liking ? 'good-job' : 'good-job-o'"
              />
              <span
                class="like-count"
              >{{comment.like_count}}</span>
            </div>
          </div>
          <div class="content">{{comment.content}}</div>
        </div>
        <div slot="label">
          <span
            class="pubdate"
          >{{comment.pubdate | dateTime('MM-DD HH:mm')}}</span>
          <van-button
            class="reply-btn"
            size="mini"
            round
            @click="$emit('reply-click', comment)"
          >{{comment.reply_count}} 回复</van-button>
        </div>
      </van-cell>
  </div>
</template>

<script>
import {
  addCommentLike,
  delCommentLike
} from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
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
  methods: {
    async onLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 如果已点赞，则取消点赞
        await delCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 如果没点赞，则点赞
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      // 视图更新
      this.comment.is_liking = !this.comment.is_liking
      // 轻提示
      this.$toast.success(this.comment.is_liking ? '点赞成功' : '取消点赞成功')
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-autName {
      font-size: 13px;
      color: #406599;
    }
    .title-like {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      .liked {
        color: pink;
      }
      .title-icon {
        font-size: 15px;
        margin-right: 4px;
      }
      .like-count {
        font-size: 10px;
      }
    }
  }
  .content {
    color: #222222;
    font-size: 16px;
    padding: 15px 0;
  }
  .pubdate {
    color: #222;
    font-size: 10px;
    margin-right: 10px;
  }
  .reply-btn {
    color: #222;
    font-size: 10px;
    height: 24px;
    border: none;
    background-color: #f4f5f6;
  }
}
</style>
