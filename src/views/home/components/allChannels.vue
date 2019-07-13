<template>
    <van-popup
    :value= 'value'
    @input= '$emit("input", $event)'
    position="bottom"
    :style="{ height: '90%' }"
    >
    <div>我的频道<span>点击进入频道</span></div>
    <van-grid>
        <van-grid-item
            v-for="(item,index) in userChannel"
            :key="item.id"
        >
            <span :class='{lightRed: index === activeIndex}'>{{item.name}}</span>
        </van-grid-item>
    </van-grid>
    <div>频道推荐<span>点击添加频道</span></div>
    <van-grid>
        <van-grid-item
            v-for="value in 4"
            :key="value"
            text="文字"
        />
    </van-grid>
    </van-popup>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false // 默认值
    },
    userChannel: {
      type: Array,
      default: () => [] // 必须死一个函数
    },
    activeIndex: {
      type: Number,
      default: 0
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
<style scoped>
div {
    font-size: 12px;
    /* margin-bottom: 30px; */
}
.lightRed {
  color: red
}
</style>
