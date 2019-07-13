<template>
    <van-popup
    :value= 'value'
    @input= '$emit("input", $event)'
    position="bottom"
    :style="{ height: '90%' }"
    >
    <div class="interval">我的频道<span>点击进入频道</span>
        <van-button plain type="danger" size='mini' style="float: right" @click='isEdit = !isEdit'>{{isEdit ? '完成' : '编辑'}}</van-button>
    </div>
    <van-grid>
        <van-grid-item
            v-for="(item,index) in userChannel"
            :key="item.id"
            @click='handelRemoveChannel(item, index)'
        >
            <span :class='{lightRed: index === activeIndex && !isEdit}'>{{item.name}}</span>
            <van-icon name="close" v-show='isEdit' class="close"/>
        </van-grid-item>
    </van-grid>
    <div class="interval">频道推荐<span>点击添加频道</span></div>
    <van-grid>
        <van-grid-item
            v-for="(item, index) in recommendChannels"
            :key="item.id"
            @click='handelAddChannel(item, index)'
        >
            <span>{{item.name}}</span>
        </van-grid-item>
    </van-grid>
    </van-popup>
</template>
<script>
import { getAllChannels } from '@/api/channels'
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
      isEdit: false,
      allChannels: []
    }
  },
  created () {
    this.handelGetAllChannels()
  },
  computed: {
    recommendChannels () {
      const userChannel = this.userChannel.map(item => item.id)
      return this.allChannels.filter(item => !userChannel.includes(item.id))
    }
  },
  methods: {
    async handelGetAllChannels () {
      const data = await getAllChannels()
      data.data.channels.forEach(item => {
        item.upLoading = false
        item.finished = false
        item.downLoading = false
        item.articles = []
        item.timestamp = Date.now()
        item.successText = ''
      })
      this.allChannels = data.data.channels
    },
    handelAddChannel (item) {
      const channel = this.userChannel.slice(0)
      const { user } = this.$store.state
      channel.push(item)
      this.$emit('update:user-channel', channel)
      if (user) {
        return
      }
      window.localStorage.setItem('channels', JSON.stringify(channel))
    },
    handelRemoveChannel (item, index) {
      const { user } = this.$store.state
      if (this.isEdit) {
        const channel = this.userChannel.slice(0)
        channel.splice(index, 1)
        this.$emit('update:user-channel', channel)
        if (user) {
          return
        }
        window.localStorage.setItem('channels', JSON.stringify(channel))
        return
      }
      this.$emit('update:activeIndex', index)
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped>
div {
    font-size: 14px;
    /* margin-bottom: 30px; */
}
span {
    font-size: 12px
}
.lightRed {
  color: red
}
.interval {
  margin-bottom: 20px;
  margin-top: 20px;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
