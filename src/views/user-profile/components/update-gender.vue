<template>
  <div class="update=gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="gender"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
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
      columns: ['男', '女']
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onConfirm () {},
    onChange () {}
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
