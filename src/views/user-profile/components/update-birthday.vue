<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onCofirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      minDate: new Date(1980, 0, 1), // 可选的最小的时间
      maxDate: new Date(2020, 10, 1), // 可选的最大时间
      currentDate: new Date(this.birthday) // 当前时间
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onCofirm () {
      // 1.加载中提示
      // 2.修改生日
      const time = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: time
      })
      // 3.修改成功提示
      this.$toast.success('修改生日成功')
      // 4.更新父组件中的生日
      this.$emit('update-birthday', time)
      // 5.关闭弹出层
      this.$emit('close')
    }
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
