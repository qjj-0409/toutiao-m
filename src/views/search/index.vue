<template>
  <div class="search-container">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  props: {},
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索关键字
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 在watch中监听数据变化，实现持久化
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    onSearch (searchStr) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchStr

      // 记录搜索历史
      const index = this.searchHistories.indexOf(searchStr)
      if (index !== -1) {
        // 有重复项，把重复项删除
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchStr)

      // 搜索历史-数据持久化
      // 如果用户已登录，则把搜索历史记录存储到线上
      // 提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史纪录
      // 如果没有登录，则把搜索历史纪录存储到本地
      // setItem('search-histories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 获取用户搜索历史纪录
      // // 因为后端存储的用户搜索历史记录只有4条，所以这里为了让历史记录看起来多一些，所以将本地的历史记录和后端存储的历史记录合并在一起
      // let searchHistories = getItem('search-histories') || []
      // // 如果用户已登录
      // if (this.user) {
      //   // 获取用户后端存储的搜索历史记录
      //   const { data } = await getSearchHistories()
      //   // searchHistories = data.data.keywords
      //   // 合并本地和线上的搜索历史纪录
      //   searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords
      //   ])]
      // }
      // // 赋值给该组件中存放历史记录的数据
      // this.searchHistories = searchHistories

      // 不再获取后端的用户搜索历史记录，直接使用本地的
      const searchHistories = getItem('search-histories') || []
      this.searchHistories = searchHistories
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
