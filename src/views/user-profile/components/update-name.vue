<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <van-field
      class="name-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  name: 'UpdateName',
  props: {},
  components: {},
  data () {
    return {
      message: '' // 输入框的值
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onConfirm () {}
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.name-field {
  background-color: unset;
  padding: 10px;
  /deep/ .van-cell__value {
    background-color: #fff;
    padding: 10px;
  }
}
</style>
