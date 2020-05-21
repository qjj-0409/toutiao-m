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
    onCofirm () {}
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
