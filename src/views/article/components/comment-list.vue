<template>
  <div class="comment-list">
    <van-cell class="top-title" title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  props: {
    // 文章id
    source: {
      type: [String, Number, Object],
      required: true
    },
    // 评论列表
    list: {
      type: Array,
      // 数组或对象的默认值必须通过函数返回
      default: () => []
    },
    // 评论类型，'a'表示对文章的评论，'c'表示对评论的回复
    type: {
      type: String,
      default: 'a'
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 加载评论的loading
      finished: false, // 控制加载结束
      offset: null, // 评论数据的偏移量，相当于页码
      limit: 10 // 每页评论数
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getComments({
        type: this.type, // 评论类型
        source: this.source.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 每页大小
      })
      console.log(data)
      const { results } = data.data
      // 2.将数据放到数据列表中
      this.list.push(...results)
      // 3.关闭本次加载的loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 如果有，更新下一页数据的页码
        this.offset = data.data.last_id
      } else {
        // 如果没有，设置finished为true，不再触发加载更多
        this.finished = true
      }

      // 将评论的数量传递给父组件
      this.$emit('comment-total-count', data.data.total_count)
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.top-title {
  font-size: 20px;
}
</style>
