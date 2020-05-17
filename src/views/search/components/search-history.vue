<template>
  <div class="search-history">
    <van-cell
      title="历史纪录"
    >
      <div v-if="isDeleteHistory">
        <span>全部删除</span>
        <span>完成</span>
      </div>
      <van-icon v-else name="delete" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      isDeleteHistory: false // 控制是否删除历史记录
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
