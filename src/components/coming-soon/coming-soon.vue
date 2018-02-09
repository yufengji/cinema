<template>
  <div class="coming-soon">
    <film-list :filmData="comingsoon" :playingFlag="false" :playTimeFlag="true" @getMore="getMore"></film-list>
    <loading :hasmore="hasmore"></loading>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import loading from '@/base/loading/loading'
import FilmList from '@/components/film-list/film-list'
import {comingSoon} from '@/api/nowPlaying.js'
export default {
  components: {
    MHeader,
    FilmList,
    loading
  },
  created () {
    this._getComingSoon()
  },
  data () {
    return {
      comingsoon: [],
      page: 1,
      count: 5,
      totalpage: 2,
      hasmore: {
        flag: true,
        tip: '正在加载'
      }
    }
  },
  methods: {
    _getComingSoon () {
      comingSoon(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.totalpage = res.data.page.total
          this.comingsoon = res.data.films
        }
      })
    },
    getMore () {
      this.page++
      if (this.page > this.totalpage) {
        this.hasmore.flag = false
        this.hasmore.tip = '没有更多了'
        return
      }
      comingSoon(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.comingsoon = this.comingsoon.concat(res.data.films)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .coming-soon
    padding-left: 30px
    padding-right: 30px
    background-color: #f9f9f9
    width: 690px
    min-height: 100%
</style>
