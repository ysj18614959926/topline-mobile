<template>
  <div>
    <van-nav-bar
        title="首页" fixed
    />
    <van-tabs v-model="active" class="channelBar">
        <div slot='nav-right' @click='isShowDialog = true'><van-icon name="wap-nav" class="wap-nav"/></div>
        <van-tab :title="item.name" v-for='item in channels' :key='item.id'>
            <van-pull-refresh v-model="item.downLoading" @refresh="onRefresh" :success-text='item.successText'>
              <van-list
              v-model="item.upLoading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              >
              <van-cell
                  v-for="article in item.articles"
                  :key="article.art_id"
                  :title="article.title"
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
    <all-channels v-model='isShowDialog'></all-channels>
  </div>
</template>
<script>
import { getChannels } from '@/api/channels'
import { getArticles } from '@/api/articles'
import AllChannels from '@/views/home/components/allChannels'
export default {
  name: 'homeIndex',
  components: {
    AllChannels
  },
  data () {
    return {
      channels: [],
      active: 0,
      isShowDialog: false
    }
  },
  created () {
    this.handelGetChannels()
  },
  computed: {
    activeChannel () {
      return this.channels[this.active]
    }
  },
  watch: {
    // 判断用户是否改变，是否重新加载
    async '$store.state.user' () {
      await this.handelGetChannels()
      this.onLoad()
    }
  },
  methods: {
    async handelGetChannels () {
      try {
        const data = await getChannels()
        data.data.channels.forEach(item => {
          item.upLoading = false
          item.finished = false
          item.downLoading = false
          item.articles = []
          item.timestamp = Date.now()
          item.successText = ''
        })
        this.channels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async handelGetArticles () {
      const { id, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId: id,
        timestamp
      })
      return data
    },
    async onLoad () {
      let data = []
      data = await this.handelGetArticles()
      if (data.data.pre_timestamp && data.data.results.length === 0) {
        this.activeChannel.timestamp = data.data.pre_timestamp
        data = await this.handelGetArticles()
      }
      this.activeChannel.timestamp = data.data.pre_timestamp
      this.activeChannel.articles.push(...data.data.results)
      this.activeChannel.upLoading = false
    },
    async onRefresh () {
      const timestamp = this.activeChannel.timestamp
      this.activeChannel.timestamp = Date.now()
      const data = await this.handelGetArticles()
      if (data.data.results.length === 0) {
        this.activeChannel.timestamp = timestamp
        this.onLoad()
        this.activeChannel.successText = '已经是最新内容'
        this.activeChannel.downLoading = false
        return
      }
      this.activeChannel.downLoading = false
      this.activeChannel.successText = '刷新成功'
    }
  }
}
</script>
<style lang='less' scoped>
.channelBar{
  margin-bottom: 100px;
}
.channelBar /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px
}
.channelBar /deep/ .van-tabs_content {
  margin-top: 92px;
}
.wap-nav {
  height: 80px;
  position: fixed;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  opacity: .8;
}
</style>
