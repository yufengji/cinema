<template>
  <div class="film-list" v-if="filmData.length">
    <ul>
      <li v-for="(item, index) in filmData" :key="index">
        <div class="film-item">
          <div class="film-item-img">
            <img :src="item.poster.origin" />
          </div>
          <div class="film-desc">
            <div class="film-name">
              <h6>{{item.name}}</h6>
              <strong v-if="playingFlag">{{item.grade}}</strong>
            </div>
            <p class="film-intro">{{item.intro}}</p>
            <p class="film-counts" v-if="playingFlag"><span>{{item.cinemaCount}}家影院上映</span><span>{{item.watchCount}}人购票</span></p>
            <p class="film-premiere-date" v-if="playTimeFlag"><span>{{formatDate(item.premiereAt)}}</span></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {isBottom} from '@/common/js/scrollBottom.js'
export default{
  props: {
    filmData: {
      type: Array,
      default () {
        return []
      }
    },
    playingFlag: {
      type: Boolean,
      default: true
    },
    playTimeFlag: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  mounted () {
    document.documentElement.scrollTop = 0
    window.addEventListener('scroll', this.getMore)
  },
  methods: {
    getMore () {
      if (isBottom()) {
        this.$emit('getMore')
      }
    },
    formatDate (d) {
      let _w = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let date = new Date(d)
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let day = date.getDate()
      let week = _w[date.getDay()]
      return `${month}月${day}日上映 ${week}`
    }
  }
}
</script>
<style lang="stylus" scoped>
  .film-list
    .film-item
      width: 100%
      padding: 40px 0
      border-bottom: dashed 1px #c9c9c9
      cursor: pointer
      .film-item-img
        width: 120px
        height: 166px
        float: left
        overflow: hidden
        img
          width: 100%
          height: 100%
      .film-desc
        padding-left: 30px
        display: inline-block
        width: 75%
        .film-name
          width:100%
          line-height: 64px
          font-size: 32px
          h6
            display: inline-block
            width: 75%
            color: #000
            overflow: hidden
            vertical-align: middle
            text-overflow: ellipsis
            white-space: nowrap
          strong
            vertical-align: middle
            display: inline-block
            width: 23%
            color: #fc7103
            text-align: right
        p
          height: 48px
          line-height: 48px
          color: #8e8e8e
          font-size: 24px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          width: 100%
          display: inline-block
        .film-counts
          span:nth-child(1)
            float: left
          span:nth-child(2)
            float: right
        .film-premiere-date
          color: #ffb375
          span
            padding-right: 30px
</style>
