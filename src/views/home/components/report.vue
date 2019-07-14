<template>
    <van-dialog
    :value='value'
    :showConfirmButton='false'
    :closeOnClickOverlay='true'
    :beforeClose='handelBeforeClose'
    >
        <van-cell-group v-if='isShow'>
            <van-cell title="不感兴趣" @click='handelDisLike(userArticleid, article)'/>
            <van-cell title="反馈垃圾内容" is-link @click='isShow = false'/>
            <van-cell title="拉黑作者" />
        </van-cell-group>
        <van-cell-group v-else>
            <van-cell icon="arrow-left" @click='isShow = true'/>
            <van-cell :title="item" v-for='(item, index) in list' :key='item' @click='handelreport(userArticleid, index)'/>
        </van-cell-group>
    </van-dialog>
</template>
<script>
import { userDisLike, userReport } from '@/api/articles'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userArticleid: {
      type: Object,
      default: null
    },
    article: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      list: [
        '其他问题',
        '标题夸张',
        '低俗色情',
        '错别字多',
        '旧闻重复',
        '广告软文',
        '内容不实',
        '涉嫌违法犯罪',
        '侵权'
      ],
      isShow: true
    }
  },
  methods: {
    handelBeforeClose (action, down) {
      this.$emit('input', false)
      down()
    },
    async handelDisLike (artId, article) {
      await userDisLike(artId.toString())
      this.$toast('操作成功')
      this.$emit('input', false)
      const newArticle = article.slice(0)
      const index = newArticle.findIndex(item => item.art_id.toString() === artId.toString())
      newArticle.splice(index, 1)
      this.$emit('update:article', newArticle)
    },
    async handelreport (artId, index) {
      try {
        await userReport(artId.toString(), index)
        this.$toast('举报成功')
        this.$emit('input', false)
      } catch (err) {
        if (err.response.status === 409) {
          this.$toast('已经举报过了')
          this.$emit('input', false)
        }
      }
    }
  }
}
</script>
<style></style>
