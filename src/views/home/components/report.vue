<template>
    <van-dialog
    :value='value'
    :showConfirmButton='false'
    :closeOnClickOverlay='true'
    :beforeClose='handelBeforeClose'
    >
        <van-cell-group v-if='isShow'>
            <van-cell title="不感兴趣" />
            <van-cell title="反馈垃圾内容" is-link @click='isShow = false'/>
            <van-cell title="拉黑作者" />
        </van-cell-group>
        <van-cell-group v-else>
            <van-cell icon="arrow-left" @click='isShow = true'/>
            <van-cell :title="item" v-for='item in list' :key='item'/>
        </van-cell-group>
    </van-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>
<style></style>
