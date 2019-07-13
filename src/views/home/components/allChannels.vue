<template>
    <van-popup
    :value= 'value'
    @input= '$emit("input", $event)'
    position="bottom"
    :style="{ height: '90%' }"
    />
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false // 默认值
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    handel (e) {
      console.log(e)
    }
  }
}
</script>
<style>
</style>
