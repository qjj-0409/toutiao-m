<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
        <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 10 // 每页数量
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      // 2.将数据放到数据别表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次加载的loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 如果有，更新下一页数据的页码
        this.page++
      } else {
        // 如果没有，设置finished为true，加载关闭
        this.finished = true
      }
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
