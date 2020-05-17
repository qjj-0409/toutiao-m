<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      :title="str"
      v-for="(str, index) in suggestions"
      :key="index"
    />
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      suggestions: [] // 搜索建议数组
    }
  },
  computed: {},
  watch: {
    // 监视数据的变化
    searchText: {
      async handler () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      },
      // 该回调会在侦听开始之后被立即调用
      immediate: true
    }
  },
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
