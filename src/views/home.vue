<template>
  <div>
    <van-nav-bar
        title="首页" fixed
    />
    <van-tabs v-model="active" class="channelBar">
        <van-tab :title="item.name" v-for='item in channels' :key='item.id'>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <van-cell
                    v-for="item in list"
                    :key="item"
                    :title="item"
                />
                </van-list>
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
    <van-tabbar v-model="active" fixed>
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { getChannels } from '@/api/channels'
export default {
  data () {
    return {
      channels: [],
      active: 0,
      loading: false,
      finished: false,
      list: [],
      isLoading: false
    }
  },
  created () {
    this.handelGetChannels()
  },
  methods: {
    async handelGetChannels () {
      try {
        const data = await getChannels()
        this.channels = data.data.channels
        console.log(data.data.channels)
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        this.$toast('刷新成功')
      }, 1000)
    }
  }
}
</script>
<style lang='less' scoped>
.channelBar {
  margin-top: 46px;
  margin-bottom: 50px;
}
</style>
