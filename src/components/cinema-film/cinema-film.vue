<template>
  <div class="cinema-film">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="swiper-wrap swiper-wrap-common">
      <div class="swiper-content">
        <div class="list">
          <div class="swiper-item" v-for="(item, index) in filmlist" :key="index" @click="chooseItem(index, item)">
            <img :src="item.minposterAddress" />
            <p v-if="index === currentIndex">{{item.filmName}}</p>
            <span class="mask" v-if="index !== currentIndex"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-wrap-common schedule-container">
      <div class="swiper-content">
        <div class="list">
          <div class="swiper-item" v-for="(item, index) in filmpaiqi" :key="index" @click="chooseDayFilm(index)">
            <a :class="{'on': index === currentIndex2}" href="javascript:;">{{item.title}}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-wrapper" v-if="index === currentIndex2" v-for="(item, index) in filmpaiqi" :key="index">
        <div class="c-list" v-for="(item2, index2) in item.items" :key="index2" @click="chooseSit(item2)">
          <div class="left">
            <p>{{formatDate2(item2.showAt)}}</p>
            <p>预计{{formatDate2(item2.showAt + (item2.film.mins * 60 * 1000))}}结束/{{item2.film.language}}{{item2.imagery}}/{{item2.hall.name}}</p>
          </div>
          <div class="right">
            <strong>￥{{item2.price.cinema}}</strong>
            <p>￥{{item2.price.maizuo}}</p>
          </div>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {CinemaFilm} from '@/api/film.js'
import {schedule} from '@/api/cinema.js'
import Vue from 'vue'
export default {
  components: {
    MHeader
  },
  data () {
    return {
      filmlist: [],
      currentIndex: 0,
      currentIndex2: 0,
      schedulelist: null,
      filmschedule: [],
      filmpaiqi: []
    }
  },
  created () {
    this._getCinemaFilm()
    this._getSchedule()
  },
  methods: {
    _getCinemaFilm () {
      CinemaFilm(this.$route.params.cinemaid).then((res) => {
        if (res.status === 0) {
          this.filmlist = res.data.filmList
        }
      })
    },
    _getSchedule () {
      schedule(0, this.$route.params.cinemaid).then((res) => {
        if (res.status === 0) {
          this._normallizeSchedule(res.data.schedules)
        }
      })
    },
    _normallizeSchedule (list) {
      let film = {}
      list.forEach((item) => {
        let key = item.film.id
        if (!film[key]) {
          film[key] = {
            name: item.film.name,
            id: key,
            items: []
          }
        }
        film[key].items.push(item)
      })
      this.schedulelist = film
      let modify = []
      for (let key in film) {
        modify.push(film[key])
      }
      this._normallizeDetailSchedule(modify[0].id)
    },
    _normallizeDetailSchedule (filmid) {
      let findFilm = this.schedulelist[filmid]
      let schedulelist = {}
      for (let i = 0; i < findFilm.items.length; i++) {
        let item = findFilm.items[i]
        let times = this.formatDate(item.showAt)
        Vue.set(item, 'times', times)
      }
      for (let i = 0; i < findFilm.items.length; i++) {
        let item = findFilm.items[i]
        let key = item.times
        if (!schedulelist[key]) {
          schedulelist[key] = {
            name: item.film.name,
            title: key,
            items: []
          }
        }
        schedulelist[key].items.push(item)
      }
      let ret = []
      for (let key in schedulelist) {
        ret.push(schedulelist[key])
      }
      this.filmpaiqi = ret
    },
    formatDate (d) {
      let date = new Date(d)
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let day = date.getDate()
      return `${month}月${day}日`
    },
    formatDate2 (d) {
      let date = new Date(d)
      let hours = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
      let minutes = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
      return `${hours}:${minutes}`
    },
    chooseItem (index, item) {
      this.currentIndex = index
      this._normallizeDetailSchedule(item.filmID)
    },
    chooseDayFilm (index) {
      this.currentIndex2 = index
    },
    chooseSit (item) {
      this.$router.push({
        path: '/seats/' + item.id,
        params: {
          scheduleid: item.id
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .cinema-film
    width: 750px
    overflow: hidden
    .swiper-wrap
      height: 220px
      background-color: #38403e
    .swiper-wrap-common
      width: 100%
      padding-top: 30px
      position: relative
      .swiper-content
        position: relative
        box-sizing: border-box
        height: 100%
        width: 100%
        overflow-x: scroll
        overflow-y: hidden
        .list
          position: relative
          box-sizing: border-box
          height: 100%
          width: auto
          white-space: nowrap
          .swiper-item
            position: relative
            display: inline-block
            box-sizing: border-box
            width: 110px
            height: 210px
            margin-left: 30px
            vertical-align: top
            img
              width: 108px
              height: 158px
              display: block
              border: 1px solid #fff
            p
              font-size: 26px
              color: #ffffff
              padding-top: 15px
              text-align: center
            .mask
              display: block
              width: 108px
              height: 158px
              background-color: #000
              opacity: 0.5
              position: absolute
              top: 0
              left: 0
    .schedule-container
      .swiper-content
        padding-bottom: 20px
        border-bottom: 1px solid #e9681f
        .list
          .swiper-item
            width: 190px
            height: 50px
            display: inline-block
            a
              display: inline-block
              width: 100%
              height: 100%
              line-height: 50px
              padding-bottom: 10px
              text-align: center
              &.on
                border-bottom: 10px solid #e9681f
    .content
      width: 690px
      padding: 0 30px
      .c-list
        width: 100%
        padding: 35px 0px 45px 0
        overflow: hidden
        position: relative
        border-bottom: dashed 1px rgba(85,85,85,0.3)
        .left
          width: 70%
          float: left
          font-size: 28px
          p
            color: #727272
          p:nth-child(1)
            font-size: 32px
            padding-bottom: 20px
            color: #000000
        .right
          float: right
          width: 20%
          strong
            font-size: 32px
            color: #f67222
            display: block
            margin-bottom: 20px
          p
            text-decoration: line-through
            font-size: 26px
            color: #c6c6c6
        .iconfont
          font-size: 32px
          color: #c6c6c6
          position: absolute
          top: 50%
          margin-top: -16px
          right: 0
      .c-list:last-child
        border-bottom: none
</style>
