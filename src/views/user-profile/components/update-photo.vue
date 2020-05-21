<template>
  <div class="update-photo">
    <img :src="image">
  </div>
</template>

<script>
export default {
  name: 'UpdatePhoto',
  props: {
    image: {
      type: String,
      required: true
    }
  },
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
</style>
