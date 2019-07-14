<template>
  <div>
    <van-nav-bar
        title="首页" fixed
    />
    <van-tabs v-model="active" class="channelBar">
        <div slot='nav-right' @click='isShowDialog = true'><van-icon name="wap-nav" class="wap-nav"/></div>
        <van-tab :title="item.name" v-for='item in channels' :key='item.id'>
            <user-report v-model='reportDialogIsShow' :user-articleid='artId' :article.sync='item.articles'></user-report>
            <van-pull-refresh v-model="item.downLoading" @refresh="onRefresh" :success-text='item.successText'>
              <van-list
              v-model="item.upLoading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              >
              <van-cell
                  v-for="article in item.articles"
                  :key="article.art_id.toString()"
              >
                <template>
                    <p>{{article.title}}</p>
                    <img v-for='imgList in article.cover.images' :src="imgList" :key='imgList'/>
                    <p>
                      <span>{{article.aut_name}}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{{article.pubdate | relativeTime}}</span>
                      <van-icon name="close" @click='handelShowDialog(article)' style="float:right"/>
                    </p>
                </template>
              </van-cell>
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
    <all-channels v-model='isShowDialog' :user-channel.sync='channels' :activeIndex.sync='active'></all-channels>
  </div>
</template>
<script>
import { getChannels } from '@/api/channels'
import { getArticles } from '@/api/articles'
import AllChannels from '@/views/home/components/allChannels'
import UserReport from '@/views/home/components/report'
export default {
  name: 'homeIndex',
  components: {
    AllChannels,
    UserReport
  },
  data () {
    return {
      channels: [],
      active: 0,
      isShowDialog: false,
      reportDialogIsShow: false,
      artId: null
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
        const { user } = this.$store.state
        let data
        if (user) {
          data = (await getChannels()).data.channels
        } else {
          const local = JSON.parse(window.localStorage.getItem('channels'))
          if (local) {
            data = local
          } else {
            data = (await getChannels()).data.channels
          }
        }
        data.forEach(item => {
          item.upLoading = false
          item.finished = false
          item.downLoading = false
          item.articles = []
          item.timestamp = Date.now()
          item.successText = ''
        })
        this.channels = data
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
    },
    handelShowDialog (articles) {
      this.artId = articles.art_id
      this.reportDialogIsShow = true
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
.channelBar /deep/ .van-tabs__content {
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
img {
  width: 200px;
  height: 150px;
}
</style>
