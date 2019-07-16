<template>
  <div>
    <form action="/">
      <van-search placeholder="请输入搜索关键词" v-model="search" @search='handelSearch(search)' />
      <van-cell-group v-if='search.length'>
          <van-cell :title="item" v-for='item in searchList' :key='item' @click='handelSearch(item)' />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell>
          历史记录
          <van-icon
            slot="right-icon"
            name="delete"
            style="line-height: inherit;"
         />
        </van-cell>
        <van-cell :title="item" v-for='item in historiesList' :key='item' />
      </van-cell-group>
    </form>
  </div>
</template>
<script>
import { userSearch } from '@/api/user'
import _ from 'lodash'
export default {
  data () {
    return {
      search: '',
      searchList: null,
      historiesList: JSON.parse(window.localStorage.getItem('histories')),
      isShow: false
    }
  },
  watch: {
    search: _.debounce(async function (newWorld) {
      if (this.search === '') {
        this.searchList = ''
        return
      }
      const data = await userSearch(newWorld)
      this.searchList = data.data.options
    }, 800)
  },
  deactivated () {
    this.search = ''
  },
  methods: {
    handelSearch (q) {
      this.historiesList.unshift(q)
      window.localStorage.setItem('histories', JSON.stringify(this.historiesList))
      this.$router.push({
        name: 'result',
        params: {
          q
        }
      })
    }
  }
}
</script>
<style>
</style>
