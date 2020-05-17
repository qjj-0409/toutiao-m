<template>
  <div class="search-container">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索框 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history
      v-else
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

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
      isResultShow: false // 控制搜索结果的展示
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onSearch () {
      console.log('搜索事件')
      // 展示搜索结果
      this.isResultShow = true
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
