<template>
  <div>
    <van-search placeholder="请输入搜索关键词" v-model="search" />
    <van-cell-group>
        <van-cell :title="item" v-for='item in searchList' :key='item'/>
    </van-cell-group>
  </div>
</template>
<script>
import { userSearch } from '@/api/user'
import _ from 'lodash'
export default {
  data () {
    return {
      search: null,
      searchList: null
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
  }
}
</script>
<style>
</style>
