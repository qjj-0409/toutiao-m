<template>
  <div class="update-photo">
    <img
      class="image"
      :src="image"
      ref="image"
    >
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
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

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
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 3.创建画布
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(file => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      // 1.加载中
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 允许背景点击
        duration: 0 // 展示时间，0 表示持续展示
      })
      // 4.使用裁切器
      const file = await this.getCroppedCanvas()
      // 2.修改头像
      const fd = new FormData()
      fd.append('photo', file)
      await updateUserPhoto(fd)
      // 3.更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 4.提示修改成功
      this.$toast.success('保存成功')
      // 5.关闭弹出层
      this.$emit('close')
    }
  },
  mounted () {
    // 1.获取需要裁切的图片DOM
    const image = this.$refs.image
    // 2.实例化裁切器
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>
<style lang='less' scoped>
.update-photo {
  height: 100%;
}
.van-nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
