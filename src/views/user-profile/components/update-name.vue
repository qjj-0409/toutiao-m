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
      v-model="localName"
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
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      localName: this.name // 输入框的值
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onConfirm () {
      // 1.加载中
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 启用背景点击
      })
      // 2.更新用户昵称
      await updateUserProfile({
        name: this.localName
      })
      // 3.更新成功提示
      this.$toast.success('修改昵称成功')
      // 4.修改父组件的name
      this.$emit('update-name', this.localName)
      // 5.关闭弹出层
      this.$emit('close')
      // 6.昵称可能存在重名，try-catch捕获一下
    }
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
