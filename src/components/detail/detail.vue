<template>
  <div class="detail">
    <div class="poster">
      <img v-if="filmdetail.cover" :src="filmdetail.cover.origin" />
    </div>
    <div class="film-intro">
      <p class="film-bt">影片简介</p>
      <div class="content">
        <div><strong>导　　演：</strong><p>{{filmdetail.director}}</p></div>
        <div><strong>主　　演：</strong><p class="actors"><span v-for="(item, index) in filmdetail.actors" :key="index">{{item.name}}<em v-if="index < filmdetail.actors.length-1">|</em></span></p></div>
        <div><strong>地区语言：</strong><p>{{filmdetail.language}}</p></div>
        <div><strong>类　　型：</strong><p>{{filmdetail.category}}</p></div>
        <div><strong>上映日期：</strong><p>{{formatDate(filmdetail.premiereAt)}}</p></div>
        <div class="intro">
          {{filmdetail.synopsis}}
        </div>
      </div>
      <div class="operation"><router-link class="btn-buy-ticket" :to="{name: 'cinemawithid', params: {id: filmdetail.id}}">立即购票</router-link></div>
    </div>
  </div>
</template>
<script>
import {DetailFilm} from '@/api/film.js'
export default {
  data () {
    return {
      filmdetail: {}
    }
  },
  created () {
    this._getDetailFilm()
  },
  methods: {
    _getDetailFilm () {
      DetailFilm(this.$route.params.id).then((res) => {
        if (res.status === 0) {
          this.filmdetail = res.data.film
        }
      })
    },
    formatDate (d) {
      let date = new Date(d)
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let day = date.getDate()
      return `${month}月${day}日上映`
    }
  }
}
</script>
<style scoped lang="stylus">
  .detail
    position: absolute
    top: 100px
    left: 0px
    width: 750px
    min-height: 90%
    overflow: hidden
    background-color: #f9f9f9
    .poster
      width: 100%
      height: 360px
      img
        width: 100%
        height: 100%
    .film-intro
      .film-bt
        margin: 32px auto
        border-left: 32px solid rgb(228, 200, 156)
        font-size: 32px
        padding-left: 8px
      .content
        width: 670px
        font-size: 28px
        margin: 0 auto
        padding-bottom: 150px
        div
          overflow: hidden
          margin-bottom: 20px
          strong
            width: 25%
            display: inline-block
            float: left
            line-height: 40px
            vertical-align: top
            font-weight: normal
          p
            width: 75%
            float: left
            line-height: 40px
            vertical-align: top
            span
              font-size: 28px
              em
                font-style: normal
                padding: 0 15px
          .actors
            font-size: 0px
        .intro
          line-height: 45px
      .operation
        position: fixed
        left: 0
        bottom: 40px
        width: 100%
        text-align: center
        .btn-buy-ticket
          display: block
          font-size: 28px
          width: 312px
          height: 72px
          line-height: 72px
          border: none
          background-color: #fe8233
          margin:0 auto
          border-radius: 36px
          color: #fff
</style>
