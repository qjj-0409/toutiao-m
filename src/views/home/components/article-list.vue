<template>
  <div class="articleList-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in articles"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 把数据合并到articles数组中
      const { results } = data.data
      this.articles.push(...results)
      // 数据全部加载完成
      if (results.length) {
        // 如果未加载完毕
        this.loading = false
        this.timestamp = data.data.pre_timestamp
      } else {
        // 所有数据加载完毕，把加载状态设置结束
        this.finished = true
      }
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.articleList-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
