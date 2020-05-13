<template>
  <div class="articleList-container">
    <!-- PullRefresh组件
         - v-model：是否处于加载中状态，绑定下拉刷新加载的loading
         - success-text：刷新成功提示文案
         - success-duration：刷新成功提示展示时长，默认为500毫秒
    -->
    <van-pull-refresh
      v-model="isRefreshing"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
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
    </van-pull-refresh>
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
      articles: [], // 文章数据列表
      loading: false, // 控制加载中的loading
      finished: false, // 控制加载结束的状态，当值为true时，不再触发加载更多
      timestamp: null, // 获取下一页数据的时间戳，以此获取下一页数据
      isRefreshing: false, // 下拉刷新的loading状态
      refreshSuccessText: '' // 下拉刷新成功后的提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 上拉加载更多函数
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的数据传当前数据，请求历史数据传指定时间戳
        with_top: 1 // 是否包含制定项，进入页面第一次请求时要包含置顶文章，1-包含指定，0-不包含
      })

      // 2.把数据合并到articles数组中
      const { results } = data.data
      this.articles.push(...results)

      // 3.设置本次数据加载状态结束，他可以判断是否需要加载下一次，只有本次加载结束，才会加载下一页，否则就会停在这里
      this.loading = false

      // 4.判断数据是否全部加载完成
      if (results.length) {
        // 如果未加载完毕，更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 所有数据加载完毕，把加载状态设置结束
        this.finished = true
      }
    },
    // 下拉刷新函数
    async onRefresh () {
      // 1.请求获取最新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })

      // 2.把数据放到数据列表的前面
      const { results } = data.data
      this.articles.unshift(...results)

      // 3.关闭刷新的状态loading
      this.isRefreshing = false

      // 4.设置下拉刷新成功后的提示文本
      this.refreshSuccessText = `更新了${results.length}条数据`
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
