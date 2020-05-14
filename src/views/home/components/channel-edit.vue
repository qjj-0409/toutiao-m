<template>
  <div class="channel-edit">
    <!-- 我的频道模块 -->
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button
        type="danger"
        size="mini"
        round
        plain
      >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字" />
    </van-grid>
    <!-- /我的频道模块 -->
    <!-- 推荐频道模块 -->
    <van-cell :border="false">
      <div slot="title">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字" />
    </van-grid>
    <!-- /推荐频道模块 -->
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.channel-edit {
  padding-top: 54px;
}
</style>
