<template>
  <div class="now-playing">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="film-list-wrap">
      <div class="film-list-nav">
        <a href="#">
          <span class="choosing">正在热映</span>
        </a>
        <a href="#">
          <span>即将上映</span>
        </a>
      </div>
      <film-list :filmData="nowplaying"></film-list>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import FilmList from '@/components/film-list/film-list'
import {nowPlaying} from '@/api/nowPlaying.js'
import {isBottom} from '@/common/js/scrollBottom.js'
export default {
  components: {
    MHeader,
    FilmList
  },
  data () {
    return {
      nowplaying: []
    }
  },
  created () {
    this._getNowPlaying()
  },
  mounted () {
    document.documentElement.scrollTop = 0
    window.addEventListener('scroll', this.getMore)
  },
  methods: {
    getMore () {
      if (isBottom()) {
        console.log('bottom')
      }
    },
    _getNowPlaying () {
      nowPlaying(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.nowplaying = res.data.films
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
