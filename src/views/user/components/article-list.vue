<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="article-wrap"
        v-for="(article, index) in list"
        :key="index"
      >
        <van-cell :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="photo"
          />
          <div slot="title">{{article.aut_name}}</div>
          <span slot="label">{{article.pubdate | relativeTime}}</span>
        </van-cell>
        <article-item
          :article="article"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
import { getArticlesByUser } from '@/api/article'
import ArticleItem from '@/components/article-item/'

export default {
  name: 'ArticleList',
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    },
    photo: {
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页数，不串默认为1
      perPage: 10 // 每页数量，不传每页数量由后端决定
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLoad () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true // 禁止背景点击
      })
      // 1.请求获取数据
      const { data } = await getArticlesByUser(this.userId, {
        page: this.page,
        per_page: this.perPage
      })
      console.log(data)
      const { results } = data.data
      this.article = results
      // 2.将数据放到数据列表中
      this.list.push(...results)
      // 3.关闭本次加载的loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 如果有，更新下一页数据的页码
        this.page = data.data.page++
      } else {
        // 如果没有，设置finised为true，不再触发加载更多
        this.finished = true
      }
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.article-wrap {
  margin-bottom: 6px;
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 8px;
  }
  .van-cell__title {
    font-size: 14px;
    color: #222;
  }
  .van-cell__label {
    font-size: 12px;
    color: #999999;
    margin-top: unset;
  }
}
</style>
