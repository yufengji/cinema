<template>
  <div class="coming-soon">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="film-list-wrap">
      <div class="film-list-nav">
        <router-link to="/now-playing">
          <span>正在热映</span>
        </router-link>
        <a href="javascript:;">
          <span class="choosing">即将上映</span>
        </a>
      </div>
      <film-list :filmData="comingsoon" :playingFlag="false" :playTimeFlag="true" @getMore="getMore"></film-list>
      <loading :hasmore="hasmore"></loading>
    </div>
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
      totalpage: 1,
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
  .film-list-wrap
    padding-left: 30px
    padding-right: 30px
    background-color: #f9f9f9
    width: 690px
    min-height: 100%
    .film-list-nav
      height: 92px
      margin: 0 auto
      border-bottom: solid #fe6e00 1px
      span
        display:inline-block
        float: left
        width: 50%
        height: 100%
        text-align: center
        font-size: 32px
        line-height: 92px
        color: #6a6a6a
        cursor: pointer
        &.choosing
          color: #fe6e00
          border-bottom: solid
</style>
