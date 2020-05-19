<template>
  <div class="comment-post">
    <van-field
      class="textarea"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      class="post-btn"
      size="mini"
      :disabled="!message"
      @click="postComment"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'CommentPost',
  props: {
    // 如果是发布文章评论，则传递文章ID
    // 如果是发布评论回复，则传递评论ID
    target: {
      type: [String, Number, Object],
      required: true
    },
    // 如果是发布评论回复，则也需要传递文章ID
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  components: {},
  data () {
    return {
      message: '' // 评论内容
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async postComment () {
      // 加载中处理
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true // 禁止背景点击
      })
      // 发布评论
      const { data } = await addComment({
        target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message, // 评论内容
        art_id: this.articleId ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      })
      console.log(data)
      // 发布成功，将新添加的评论相关信息传递给父组件，让父组件来处理发表评论成功后的事情
      // data.data.new_obj是新发布的评论项的相关信息
      this.$emit('post-success', data.data.new_obj)
      // 轻提示
      this.$toast.success('发布成功')
      // 清空输入框
      this.message = ''
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 14px;
  .textarea {
    background-color: #F5F7F9;
  }
  .post-btn {
    border: none;
    font-size: 15px;
    color: #797979;
  }
}
</style>
