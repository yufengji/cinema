<template>
  <div class="cinema-list">
    <div class="list" v-for="(item, index) in cinema" :key="index" ref="ListGroup">
      <div class="title" @click="showCinema(index)">
        {{item.title}}
      </div>
      <div class="content">
        <div class="cinema-wrap" v-for="item2 in item.items" :key="item2.id">
          <div class="top" @click="showSchdule(item2, $event)">
            <div class="cinema-wrap-left">
              <h6>{{item2.name}}</h6>
              <p>{{item2.address}}</p>
              <p>距离未知 | 剩余{{item2.avaliableSchedule}}场</p>
            </div>
            <div class="cinema-wrap-right">
              <strong>￥{{item2.minimumPrice}}</strong>
            </div>
          </div>
          <div class="bottom" v-if="item2.schedule">
            <div class="schedule-top">
              <span href="javascript:;" class="active" v-for="(item3, index3) in item2.schedule" :key="index3">{{item3.title}}</span>
            </div>
            <div class="schedule-time">
              <ul v-for="(item4, index4) in item2.schedule" :key="index4" v-if="index4 === currentIndex">
                <li v-for="(item5, index5) in item4.items" :key="index5">
                  <div class="s-t-l">
                    <p>17:10</p>
                    <p class="end">预计</p>
                  </div>
                  <div class="s-t-r">
                    <strong>￥25</strong>
                  </div>
                  <i class="iconfont icon-right"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {schedule} from '@/api/cinema.js'
import {addClass, hasClass, removeClass} from '@/common/js/dom.js'
export default {
  data () {
    return {
      sheduleTime: [],
      currentIndex: 0
    }
  },
  props: {
    cinema: {
      type: Array,
      default () {
        return []
      }
    },
    filmid: {
      type: String,
      default: ''
    }
  },
  methods: {
    showCinema (index) {
      let _element = this.$refs.ListGroup[index].getElementsByClassName('content')[0]
      let _height = _element.getElementsByClassName('cinema-wrap')[0].offsetHeight
      let _len = _element.getElementsByClassName('cinema-wrap').length
      let _h = 0
      if (hasClass(_element, 'show')) {
        _h = 0
        removeClass(_element, 'show')
      } else {
        _h = _height * _len
        addClass(_element, 'show')
      }
      _element.style.height = _h + 'px'
    },
    showSchdule (item) {
      let _target = event.currentTarget.parentNode
      schedule(this.filmid, item.id).then((res) => {
        if (res.status === 0) {
          this.sheduleTime = this._normallizeSchdule(res.data.schedules)
          this.$nextTick(() => {
            let _addHeight = _target.getElementsByClassName('bottom')[0].offsetHeight
            let _oldHeight = parseInt((_target.parentNode.getAttribute('style').split(':')[1]))
            _target.parentNode.style.height = (_addHeight + _oldHeight) + 'px'
          })
        }
      })
    },
    _normallizeSchdule (list) {
      // 当天凌晨时间戳
      let _nowT = new Date(new Date().setHours(23, 59, 59)) / 1000 * 1000
      // 第二天凌晨时间戳
      let _nextT = _nowT + 86400000
      // 第三天凌晨
      let _nextsT = _nowT + 86400000 * 2
      let timeMap = {}
      list.forEach((item) => {
        const showAt = item.showAt
        if (showAt <= _nowT) {
          let key = 'today'
          if (!timeMap[key]) {
            timeMap[key] = {
              title: '今天',
              items: []
            }
          }
          timeMap[key].items.push(item)
        } else if (showAt > _nowT && showAt < _nextT) {
          let key = 'tomorrow'
          if (!timeMap[key]) {
            timeMap[key] = {
              title: '明天',
              items: []
            }
          }
          timeMap[key].items.push(item)
        } else if (showAt > _nextT && showAt < _nextsT) {
          let key = 'afterTomorrow'
          if (!timeMap[key]) {
            timeMap[key] = {
              title: '后天',
              items: []
            }
          }
          timeMap[key].items.push(item)
        }
      })
      let ret = []
      for (let key in timeMap) {
        let val = timeMap[key]
        ret.push(val)
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      for (let i = 0; i < this.cinema.length; i++) {
        let obj = this.cinema[i]
        for (let ii = 0; ii < obj.items.length; ii++) {
          if (obj.items[ii].id === list[0].cinema.id) {
            Vue.set(obj.items[ii], 'schedule', ret)
          }
        }
      }

      console.log(this.cinema)
      // return ret
    }
  }
}
</script>
<style scoped lang="stylus">
  .cinema-list
    width: 750px
    .list
      margin-bottom: 1.5px
      .title
        height: 95px
        line-height: 95px
        font-size: 28px
        padding-left: 30px
        background: #e1e1e1
        color: #636363
        cursor: pointer
      .content
        background: #ffffff
        height: 0px
        overflow: hidden
        transition: height 0.4s linear
        .cinema-wrap
          padding: 30px 30px
          cursor: pointer
          border-bottom: 1px solid #e1e1e1
          .top
            overflow: hidden
            .cinema-wrap-left
              width: 75%
              float: left
              cursor: pointer
              overflow: hidden
              h6
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                display: inline-block
                vertical-align: text-top
                font-size: 32px
                margin-bottom: 20px
                width: 100%
                font-weight: normal
                margin-right: 6px
              p
                display: inline-block
                font-size: 28px
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                width: 100%
                color: #ccc
                line-height: 45px
            .cinema-wrap-right
              width: 25%
              float: right
              text-align: right
              strong
                font-size: 32px
                color: #fc8637
          .bottom
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
</style>
