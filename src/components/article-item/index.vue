<template>
  <div class="article-item">
    <van-cell
      class="article-item-wrap"
    >
      <!-- 标题 -->
      <div
        slot="title"
        class="van-multi-ellipsis--l3"
      >{{article.title}}</div>
      <!-- /标题 -->
      <!-- 底部信息 -->
      <div
        slot="label"
      >
        <!-- 三个封面 -->
        <div
          class="label-cover"
          v-if="article.cover.type === 3"
        >
          <div
            class="cover-item"
            v-for="(image, index) in article.cover.images"
            :key="index"
          >
            <van-image
              class="item-img"
              fit="cover"
              :src="image"
            />
          </div>
        </div>
        <!-- /三个封面 -->
        <div class="label-info">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate}}</span>
        </div>
      </div>
      <!-- /底部信息 -->
      <!-- 右侧封面 -->
      <div
        slot="default"
        v-if="article.cover.type === 1"
      >
        <van-image
          class="right-cover"
          fit="cover"
          :src="article.cover.images[0]"
        />
      </div>
      <!-- /右侧封面 -->
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
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
.article-item {
  .article-item-wrap {
    /deep/ .van-cell__value {
      flex: unset;
      margin-left: 12px;
      .right-cover {
        width: 116px;
        height: 73px;
      }
    }
    .label-cover {
      display: flex;
      padding: 15px 0;
      .cover-item {
        flex: 1;
        height: 73px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .item-img {
          width: 100%;
          height: 73px;
        }
      }
    }
    .label-info {
      span {
        margin-right: 12px;
      }
    }
  }
}
</style>
