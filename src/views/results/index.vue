<template>
  <div>
        <van-nav-bar title="搜索结果" left-text="返回" left-arrow @click-left='$router.push("/search")'>
        </van-nav-bar>
        <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in resultsList"
          :key="item.art_id"
          :title="item.title"
        />
      </van-list>
  </div>
</template>
<script>
import { searchResultsList } from '@/api/search'
export default {
  data () {
    return {
      page: 1,
      perPage: 10,
      resultsList: [],
      finished: false,
      isLoading: false
    }
  },
  computed: { // 声明一个计算属性，不至于每次调用都this.$route.params.q
    q () {
      return this.$route.params.q
    }
  },
  // activated () {
  //   this.onLoad()
  // },
  deactivated () {
    this.$destroy()
  },
  async created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      const data = await this.handelGetResult()
      if (!data.data.results.length) {
        this.isLoading = false
        this.finished = true
        return
      }
      this.resultsList.push(...data.data.results)
      this.page++
      this.isLoading = false
    },
    handelGetResult () {
      return searchResultsList({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
    }
  }
}
</script>
<style>
</style>
