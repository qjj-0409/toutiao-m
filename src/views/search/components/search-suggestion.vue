<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
    >
      <div slot="title" v-html="hightLight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'

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
      // debounce 函数
      // 参数1：函数
      // 参数2：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // 该回调会在侦听开始之后被立即调用
      immediate: true
    }
  },
  created () {},
  methods: {
    hightLight (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
