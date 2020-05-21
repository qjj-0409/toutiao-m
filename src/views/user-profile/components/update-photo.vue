<template>
  <div class="update-photo">
    <img :src="image">
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      required: true
    }
  },
  components: {},
  data () {
    return {
      image: window.URL.createObjectURL(this.file)
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onConfirm () {
      // 1.加载中
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // 允许背景点击
      })
      // 2.修改头像
      const fd = new FormData()
      fd.append('photo', this.file)
      await updateUserPhoto(fd)
      // 3.更新父组件中的用户头像
      this.$emit('update-photo', this.image)
      // 4.提示修改成功
      this.$toast.success('保存成功')
      // 5.关闭弹出层
      this.$emit('close')
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.van-nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
