<template>
  <div class="seats">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="infomation">
      <div class="info-left">
        <h6 v-if="info">{{info.cinema.name}}</h6>
        <p v-if="info">{{formatDate(info.showAt)}} {{info.imagery}}</p>
      </div>
      <div class="info-right">
        <a href="javascript:;">换一场</a>
      </div>
    </div>
    <div class="seating-chart">
      <div class="map">
        <div class="screen">
          <span v-if="info">{{info.hall.name}}</span>银幕方向
        </div>
        <div class="sit" v-if="seats.length">
          <div class="rowtip" v-if="rownum">
            <div v-for="(item, index) in rownum" :key="index" :style="{width: '25px', height:'25px', top: index * 25 + 'px' }">{{item + 1}}</div>
          </div>
          <div class="seat-order" :style="{width: cloumn * 25 + 'px', marginLeft: (-cloumn * 12.5) + 'px'}">
            <div v-for="(item, index) in seats" :key="index" :data-seat-row="item.row" :data-seat-cloumn="item.column" class="seat" :class="{'haspeople': item.isOccupied}" :style="{width:'20px', height:'20px', top: (item.row - 1) * 25 + 'px', left: (item.column -1) * 25 + 'px'}" @click="chooseSit(item, $event)"></div>
          </div>
        </div>
        <div class="sit-error" v-if="errormsg != ''">
          <span>{{errormsg}}</span><a href="javascript:;" @click="_getScheduleSit">点击刷新</a>
        </div>
        <loading v-if="!seats.length && errormsg === ''" :hasmore="hasmore"></loading>
      </div>
    </div>
    <div class="choose-sit-info">
      <div class="sit-show">
        <span v-for="(item, index) in myseats" :key="index">{{item.row}}排{{item.column}}座</span>
      </div>
      <div class="price">
        <div class="price-left">
          <p>￥{{allprice}}</p>
          <span>=￥{{price}}X{{myseats.length}}</span>
        </div>
        <div class="price-right">
          确认
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import Loading from '@/base/loading/loading'
import {seatingChart, scheduleDetail} from '@/api/cinema.js'
import {mapGetters, mapMutations} from 'vuex'
import {addClass, hasClass, removeClass, removeArray} from '@/common/js/dom.js'
export default {
  components: {
    MHeader,
    Loading
  },
  data () {
    return {
      info: null,
      rownum: [],
      seats: [],
      row: 0,
      cloumn: 0,
      hasmore: {
        flag: true,
        tip: '正在加载座位'
      },
      myseats: [],
      allprice: 0,
      price: 0,
      errormsg: ''
    }
  },
  computed: {
    ...mapGetters([
      'scheduleid'
    ])
  },
  created () {
    this._getScheduleFilm()
    this._getScheduleSit()
  },
  methods: {
    _getScheduleFilm () {
      scheduleDetail(this.$route.params.scheduleid).then((res) => {
        if (res.status === 0) {
          this.info = res.data.schedule
          this.price = res.data.schedule.price.maizuo
          this.SET_TITLE(res.data.schedule.film.name)
        }
      })
    },
    _getScheduleSit () {
      if (this.errormsg !== '') {
        this.errormsg = ''
      }
      seatingChart(this.$route.params.scheduleid).then((res) => {
        if (res.status === 0) {
          let num = res.data.seatingChart.height
          this.row = num
          this.cloumn = res.data.seatingChart.width
          for (let i = 0; i < num; i++) {
            this.rownum.push(i)
          }
          this.seats = res.data.seatingChart.seats
        } else if (res.status !== 0) {
          this.errormsg = res.msg
        }
      })
    },
    formatDate (d) {
      let date = new Date(d)
      let year = date.getFullYear()
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      let hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
      let minuts = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      return `${year}-${month}-${day} ${hours}:${minuts}`
    },
    chooseSit (item) {
      if (item.isOccupied) {
        return
      }
      if (hasClass(event.currentTarget, 'choose')) {
        removeClass(event.currentTarget, 'choose')
        if (this.myseats.length) {
          this.myseats.forEach((val, index) => {
            if (val.row === item.row && val.column === item.column) {
              this.myseats = removeArray(index, this.myseats)
              this.allprice = this.price * this.myseats.length
            }
          })
        }
      } else {
        addClass(event.currentTarget, 'choose')
        this.myseats.push({'row': item.row, 'column': item.column})
        this.allprice = this.price * this.myseats.length
      }
    },
    ...mapMutations({
      SET_TITLE: 'SET_TITLE'
    })
  }
}
</script>
<style scoped lang="stylus">
  .seats
    width: 750px
    background-color: #f6f6f6
    min-height: 100%
    .infomation
      padding: 30px 40px
      overflow: hidden
      background: #ffffff
      .info-left
        float: left
        width: 60%
        h6
          font-size: 32px
          width: 100%
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
          padding-bottom: 20px
        p
          font-size: 28px
          width: 100%
          overflow: hidden
          text-overflow:ellipsis
          white-space: nowrap
      .info-right
        width: 30%
        float: right
        a
          font-size: 28px
          display: block
          width: 100%
          height: 72px
          border-radius: 35px
          color: #36bfd1
          background-color: rgba(255,255,255,0)
          border: 1px solid rgba(0,0,0,0.26)
          text-align: center
          line-height: 72px
    .seating-chart
      width: 750px
      height: 800px
      background: #ffffff
      margin-top: 20px
      position: relative
      overflow: hidden
      .map
        width: 100%
        margin-top: 150px
        position: relative
        .screen
          width: 80%
          height: 50px
          line-height: 50px
          border-radius: 25px
          color: rgba(0,0,0,0.26)
          border: 1px solid rgba(0,0,0,0.26)
          text-align: center
          margin: 0 auto
        .sit
          position: relative
          .rowtip
            position: absolute
            left: 30px
            top: 30px
            &>div
              position: absolute
              text-align: center
              font-size: 24px
              color: #aaa
          .seat-order
            position: absolute
            left: 50%
            top: 30px
            .seat
              position: absolute
              border: 1px solid #aaa
              border-radius: 5px
              box-sizing:border-box
            .haspeople
              border: 1px solid #ff6640
              background: #ff6640
              &:before
                font-family:"iconfont" !important
                -webkit-font-smoothing: antialiased
                -moz-osx-font-smoothing: grayscale
                font-size: 16px
                content: "\e608"
                color: #ffffff
                text-align: center
                position: absolute
                top: 3px
                left: 50%
                margin-left: -8px
            .choose
              border: 1px solid #5aaaf4
              background: #5aaaf4
              &:before
                font-family:"iconfont" !important
                -webkit-font-smoothing: antialiased
                -moz-osx-font-smoothing: grayscale
                font-size: 24px
                content: "\e609"
                color: #ffffff
                text-align: center
                position: absolute
                top: -2px
        .sit-error
          text-align: center
          font-size: 28px
          margin-top: 120px
          a
            text-decoration: underline
            color: #2626f2
    .choose-sit-info
      width: 100%
      height: 230px
      background: #ffffff
      position: absolute
      bottom: 0
      left: 0
      .sit-show
        padding: 30px 40px
        overflow: hidden
        min-height: 50px
        border-bottom: 1px solid #cccccc
        border-top: 1px solid #cccccc
        span
          display: inline-block
          margin: 0 6px
          text-align: center
          width: 130px
          height: 50px
          font-size: 24px
          line-height: 50px
          box-sizing: border-box
          background-color: #36bfd1
          float: left
          border-radius: 12px
          color: #fff
      .price
        height: 120px
        .price-left
          float: left
          width: 65%
          padding: 20px 0 0 5%
          p
            font-size: 40px
            color: #ff6640
            display: block
            line-height: 36px
            padding-bottom: 15px
          span
            color: rgba(0,0,0,0.26)
            font-size: 28px
        .price-right
          line-height: 120px
          float: right
          width: 30%
          background: #fe8233
          text-align: center
          color: #ffffff
          font-size: 28px
</style>
