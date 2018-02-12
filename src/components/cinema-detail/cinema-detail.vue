<template>
  <div class="cinema-detail">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="cinemaimg">
      <img v-if="cinemadetail" :src="cinemadetail.logoUrl" />
    </div>
    <div class="box-wrap">
      <div class="box">
        <p>订座票</p>
        <p>选好场次及座位，到影院自助机取票</p>
        <a class="btn-seat" href="javascript:;" @click="takeSit">立即订座</a>
      </div>
      <div class="box">
        <p>通兑票</p>
        <p>有效期内到影院前台兑换影票</p>
        <a class="btn-ticket" href="javascript:;">立即订票</a>
      </div>
      <div class="box address">
        <p>地址</p>
        <p v-if="cinemadetail">{{cinemadetail.address}}</p>
      </div>
      <div class="box address">
        <p>电话</p>
        <p v-if="cinemadetail">{{cinemadetail.telephones[0]}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {cinemadetail, cinemaitem} from '@/api/cinema.js'
import {mapMutations} from 'vuex'
export default {
  components: {
    MHeader
  },
  data () {
    return {
      cinemadetail: null,
      cinemaid: 0
    }
  },
  created () {
    this._getCinemaDetail()
    this._getCinemaItem()
  },
  methods: {
    _getCinemaDetail () {
      cinemadetail(this.$route.params.cinemaid).then((res) => {
        if (res.status === 0) {
          this.cinemadetail = res.data.cinema
          console.log(res.data.cinema)
        }
      })
    },
    _getCinemaItem () {
      cinemaitem(this.$route.params.cinemaid).then((res) => {
        console.log(res)
      })
    },
    takeSit () {
      this.SET_TITLE(this.cinemadetail.name)
      this.$router.push({
        path: '/allcinema/' + this.cinemadetail.id + '/film',
        params: {
          cinemaid: this.cinemadetail.id
        }
      })
    },
    ...mapMutations({
      SET_TITLE: 'SET_TITLE'
    })
  }
}
</script>
<style lang="stylus" scoped>
  .cinema-detail
    width: 750px
    min-height: 100%
    background-color: #f9f9f9
    .cinemaimg
      width: 750px
      height: 305px
      img
        width: 100%
        height: 100%
    .box-wrap
      margin-top: 100px
      padding:0 30px 50px 30px
      .box
        border-bottom: 1px #d6d6d6 dotted
        margin-top: 70px
        position: relative
        p
          font-size: 30px
          color: #000000
          padding-bottom: 30px
          &:nth-child(2)
            font-size: 26px
            color: #737373
        a
          display: block
          width: 190px
          border-radius: 35px
          height: 70px
          border: none
          font-size: 26px
          position: absolute
          right: 0px
          top: 10px
          text-align: center
          line-height: 70px
          &.btn-seat
            background-color: #fe8233
            color: #fff
          &.btn-ticket
            color: #ff8032
            background-color: #f9f9f9
            border: 1px solid #ff8032
      .address
        padding-bottom: 30px
        p
          font-size: 26px
</style>
