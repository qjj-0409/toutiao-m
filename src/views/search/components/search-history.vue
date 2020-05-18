<template>
  <div class="search-history">
    <van-cell
      title="历史纪录"
    >
      <div v-if="isDeleteHistory">
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteHistory = false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteHistory = true"
      />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="deleteHistory(history, index)"
    >
      <van-icon
        name="close"
        v-if="isDeleteHistory"
      />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
// import { deleteSearchHistories } from '@/api/search'

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
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  methods: {
    deleteHistory (history, index) {
      if (this.isDeleteHistory) {
        // 如果是删除状态，执行删除操作
        this.searchHistories.splice(index, 1)
        // if (this.user) {
        //   // 如果是登录状态，更新线上的搜索历史
        // } else {
        //   // 如果未登录，删除本地的搜索历史
        //   setItem('search-histories', this.searchHistories)
        // }
        // 不再判断用户是否登录，直接更新本地存储
        // setItem('search-histories', this.searchHistories)
      } else {
        // 否则执行搜索操作
        this.$emit('search', history)
      }
    }
    // async deleteAll () {
    //   if (this.user) {
    //     // 如果是登录状态，删除线上的所有
    //     await deleteSearchHistories()
    //   } else {
    //     // 如果是未登录状态，则删除本地的数据，并将搜索历史更新为空
    //     this.searchHistories = []
    //     setItem('search-histories', null)
    //   }
    // }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
