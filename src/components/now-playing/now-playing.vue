<template>
  <div class="now-playing">
    <film-list :filmData="nowplaying" @getMore="getMore"></film-list>
    <loading :hasmore="hasmore"></loading>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import FilmList from '@/components/film-list/film-list'
import loading from '@/base/loading/loading'
import {nowPlaying} from '@/api/nowPlaying.js'
export default {
  components: {
    MHeader,
    FilmList,
    loading
  },
  data () {
    return {
      nowplaying: [],
      page: 1,
      count: 5,
      totalpage: 1,
      hasmore: {
        flag: true,
        tip: '正在加载'
      }
    }
  },
  created () {
    this._getNowPlaying()
  },
  methods: {
    getMore () {
      this.page++
      if (this.page > this.totalpage) {
        this.hasmore.flag = false
        this.hasmore.tip = '没有更多了'
        return
      }
      nowPlaying(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.nowplaying = this.nowplaying.concat(res.data.films)
        }
      })
    },
    _getNowPlaying () {
      nowPlaying(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.nowplaying = res.data.films
          this.totalpage = res.data.page.total
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .now-playing
    padding-left: 30px
    padding-right: 30px
    background-color: #f9f9f9
    width: 690px
    min-height: 100%
</style>
