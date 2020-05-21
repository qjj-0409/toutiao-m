<template>
  <div class="update=gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.gender
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onConfirm () {
      // 1.加载中提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 2.修改性别
      await updateUserProfile({
        gender: this.defaultIndex
      })
      // 3.更新成功提示
      this.$toast.success('修改性别成功')
      // 4.修改父组件的gender
      this.$emit('update-gender', this.defaultIndex)
      // 5.关闭弹出层
      this.$emit('close')
    },
    // 选项改变时触发
    onGenderChange (picker, value, index) {
      // picker：Picker实例
      // value：选中值
      // index：选中值对应的索引
      // 获取picker实例改变后选中项的值
      this.defaultIndex = index
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
