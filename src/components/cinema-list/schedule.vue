<template>
  <div class="schedule">
    <div class="has-schedule" v-if="schedule.length">
      <div class="schedule-top">
        <span href="javascript:;" :class="{'active': index3 === currentIndex}" v-for="(item, index) in schedule" :key="index" @click="showTiemSchedule(index)">{{item.title}}</span>
      </div>
      <div class="schedule-time">
        <ul v-for="(item, index) in item.schedule" :key="index" v-if="index === currentIndex">
          <li v-for="(item2, index2) in item.items" :key="index2" @click="chooseSit(item2)">
            <div class="s-t-l">
              <p>{{formatDate(item5.showAt)}}</p>
              <p class="end">预计{{formatDate(item2.showAt + item2.film.mins*60*1000)}}结束/{{item2.imagery}}/{{item2.hall.name}}</p>
            </div>
            <div class="s-t-r">
              <strong>￥{{item2.price.maizuo}}</strong>
              <span>￥{{item2.price.cinema}}</span>
            </div>
            <i class="iconfont icon-right"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class=""  v-if="noschedule">
      <p style="text-align: center;line-height:50px">当前影院暂无排期</p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {getCookie} from '@/common/js/cookie.js'
export default {
  props: {
    schedule: {
      type: Array,
      default () {
        return []
      }
    },
    noschedule: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  created () {
  },
  methods: {
    formatDate (d) {
      let date = new Date(d)
      let hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
      let minutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      return `${hours}:${minutes}`
    },
    showTiemSchedule (index) {
      this.currentIndex = index
    },
    chooseSit (item) {
      this.SET_GO_SEATS(true)
      this.SET_SCHEDULE_ID(item.id)
      if (getCookie('isMainAccount')) {
        // 已登录跳转到选择座位 通过场次id选择座位
        this.SET_TITLE(item.film.name)
        this.$router.push({
          name: 'scheduleDetail',
          params: {scheduleid: item.id}
        })
        return
      }
      this.SET_TITLE('登录')
      this.$router.push({
        path: '/login'
      })
    },
    ...mapMutations({
      SET_TITLE: 'SET_TITLE',
      SET_GO_SEATS: 'SET_GO_SEATS',
      SET_SCHEDULE_ID: 'SET_SCHEDULE_ID'
    })
  }
}
</script>
<style lang="stylus" scoped>
  .schedule
    width: 100%
    margin-top: 20px
  .schedule-top
    height: 70px
    span
      height: 70px
      width: 150px
      margin: 10px 0 0 20px
      padding: 0 30px
      display: inline-block
      border-radius: 35px
      font-size: 28px
      line-height: 70px
      text-align: center
      background-color: #fff
      color: #555
      cursor: pointer
      &.active
        background-color: #ff6a19
        color: #eee
  .schedule-time
    margin-top: 30px
    li
      overflow: hidden
      padding: 20px 0
      border-bottom: 1px dashed #cccccc
      font-size: 32px
      position: relative
      .iconfont
        font-size: 32px
        position: absolute
        right: 0
        top: 50%
        margin-top: -16px
        color: #959595
    li:last-child
      border-bottom: none
    .s-t-l
      float: left
      width: 75%
      p
        height: 60px
        line-height: 60px
      .end
        font-size: 28px
        color: #959595
        width: 100%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .s-t-r
      width: 20%
      float: right
      font-size: 32px
      color: #fc8637
      strong
        line-height: 60px
        height: 60px
        display: inline-block
      span
        color: #959595
        font-size: 28px
        display: inline-block
        text-decoration: line-through
        padding-top: 15px
</style>
