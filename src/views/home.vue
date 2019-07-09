<template>
  <div>
    <van-nav-bar
        title="首页" fixed
    />
    <van-tabbar v-model="active" fixed>
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style>
</style>
