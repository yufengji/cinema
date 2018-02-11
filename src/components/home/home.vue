<template>
  <div class="home">
    <m-header></m-header>
    <div class="handle-height"></div>
    <swipe :billboards="billboards"></swipe>
    <div class="now-playing">
      <div class="film-list">
        <ul>
          <li v-for="(item, index) in nowplaying" :key="index" @click="goDetail(item)">
            <div class="move-item">
              <div class="move-item-img">
                <img :src="item.cover.origin" />
              </div>
              <div class="desc">
                <div class="desc-left">
                  <h6>{{item.name}}</h6>
                  <p>{{item.cinemaCount}}家影院上映{{item.watchCount}}人购票</p>
                </div>
                <div class="desc-right">
                  {{item.grade}}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="btn-more">
          <router-link to="/film/now-playing">更多热映电影</router-link>
        </div>
      </div>
    </div>
    <div class="soon-playing">
      <div class="div-line">
        <div class="upcoming">
          即将上映
        </div>
      </div>
      <div class="film-list">
        <ul>
          <li v-for="(item, index) in comingsoon" :key="index" @click="goDetail(item)">
            <div class="move-item">
              <div class="move-item-img" :style="{background: 'url('+ item.cover.origin +') no-repeat', backgroundSize: 'cover'}">
              </div>
              <div class="desc">
                <div class="desc-left">
                  <h6>{{item.name}}</h6>
                </div>
                <div class="desc-right">
                  {{formatDate(item.premiereAt)}}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="btn-more">
          <router-link to="/film/coming-soon">更多即将上映电影</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import Swipe from '@/base/swipe/swipe'
import {billboard} from '@/api/home.js'
import {getCookie} from '@/common/js/cookie.js'
import {nowPlaying, comingSoon} from '@/api/nowPlaying.js'
import {mapMutations} from 'vuex'
export default {
  components: {
    MHeader,
    Swipe
  },
  data () {
    return {
      billboards: [],
      page: 1,
      count: 5,
      nowplaying: [],
      comingsoon: []
    }
  },
  created () {
    this._getBillBoards()
    this._getNowPlaying()
    this._getComingSoon()
    this.SET_CITY(getCookie('cityName'))
  },
  methods: {
    _getBillBoards () {
      billboard().then((res) => {
        if (res.status === 0) {
          this.billboards = res.data.billboards
        }
      })
    },
    _getNowPlaying () {
      nowPlaying(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.nowplaying = res.data.films
        }
      })
    },
    _getComingSoon () {
      comingSoon(this.page, this.count).then((res) => {
        if (res.status === 0) {
          this.comingsoon = res.data.films
        }
      })
    },
    formatDate (d) {
      let date = new Date(d)
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let day = date.getDate()
      return `${month}月${day}日上映`
    },
    goDetail (item) {
      this.SET_TITLE(item.name)
      this.$router.push({path: '/film/' + item.id, params: {id: item.id}})
    },
    ...mapMutations({
      SET_CITY: 'SET_CITY',
      SET_TITLE: 'SET_TITLE'
    })
  }
}
</script>
<style scoped lang="stylus">
  .home
    background-color: #ebebeb
    padding-bottom: 60px
  .film-list
    width: 750px
    ul
      padding-top: 36px
      li
        margin:0 34px 34px 34px
        padding-bottom: 20px
        box-shadow: 1px 1px 2px #a8a8a8
        cursor: pointer
        .move-item-img
          overflow: hidden
          position: relative
          width: 100%
          display: block
          height: 325px
          background-size: cover
        .desc
          height: 100px
          .desc-left
            float: left
            padding-top: 26px
            width: 75%
            font-size: 24px
            line-height: 30px
            padding-left: 5%
            p
              color: #9a9a9a
              padding-top: 10px
          .desc-right
            float: right
            width: 20%
            text-align: center
            color: #f78360
            font-size: 36px
            line-height: 100px
    .btn-more
      width: 320px
      height: 60px
      border: 1px solid #aaa
      border-radius: 30px
      margin: 20px auto 60px
      text-align: center
      line-height: 60px
      font-size: 24px
      color: #616161
      cursor: pointer
  .soon-playing
    .div-line
      position: relative
      margin-top: 60px
      margin-bottom: 60px
      border-bottom: 1px solid #a8a8a8
      .upcoming
        width: 130px
        height: 40px
        margin: 0 auto
        margin-bottom: -20px
        border-radius: 10px
        font-size: 20px
        line-height: 40px
        text-align: center
        color: #eee
        background-color: #a7a7a7
    .film-list
      ul
        li
          padding-bottom: 0
          .desc
            height: 80px
            .desc-left
              width: 60%
            .desc-right
              width: 35%
              line-height: 80px
              font-size: 20px
      .btn-more
        margin-bottom: 0px

</style>
