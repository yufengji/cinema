<template>
  <div class="cinema">
    <cinema-list :cinema="cinema" :filmid="filmid" @showSchdule="showSchdule"></cinema-list>
  </div>
</template>
<script>
import Vue from 'vue'
import {cinema, schedule} from '@/api/cinema.js'
import CinemaList from '@/components/cinema-list/cinema-list.vue'
export default {
  created () {
    this._getCinema()
    this.filmid = this.$route.params.id
  },
  data () {
    return {
      cinema: [],
      filmid: 0,
      sheduleTime: []
    }
  },
  components: {
    CinemaList
  },
  methods: {
    showSchdule (item) {
      console.log(item)
      let _target = event.currentTarget.parentNode
      schedule(this.filmid, item.id).then((res) => {
        if (res.status === 0) {
          this.sheduleTime = this._normallizeSchdule(res.data.schedules, item.id)
          this.$nextTick(() => {
            let _addHeight = _target.getElementsByClassName('bottom')[0].offsetHeight
            let _oldHeight = parseInt((_target.parentNode.getAttribute('style').split(':')[1]))
            _target.parentNode.style.height = (_addHeight + _oldHeight) + 'px'
          })
        }
      })
    },
    _normallizeSchdule (list, id) {
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
              sort: 'a',
              items: []
            }
          }
          timeMap[key].items.push(item)
        } else if (showAt > _nowT && showAt < _nextT) {
          let key = 'tomorrow'
          if (!timeMap[key]) {
            timeMap[key] = {
              title: '明天',
              sort: 'b',
              items: []
            }
          }
          timeMap[key].items.push(item)
        } else if (showAt > _nextT && showAt < _nextsT) {
          let key = 'afterTomorrow'
          if (!timeMap[key]) {
            timeMap[key] = {
              title: '后天',
              sort: 'c',
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
        return a.sort.charCodeAt(0) - b.sort.charCodeAt(0)
      })
      for (let i = 0; i < this.cinema.length; i++) {
        let obj = this.cinema[i]
        for (let ii = 0; ii < obj.items.length; ii++) {
          if (!list.length) {
            if (obj.items[ii].id === id) {
              Vue.set(obj.items[ii], 'noschedule', true)
            }
          } else {
            if (obj.items[ii].id === list[0].cinema.id) {
              Vue.set(obj.items[ii], 'schedule', ret)
            }
          }
        }
      }
    },
    _getCinema () {
      cinema(this.$route.params.id).then((res) => {
        if (res.status === 0) {
          this.cinema = this._normallizeCinema(res.data.cinemas)
        }
      })
    },
    _normallizeCinema (list) {
      let map = {}
      list.forEach((item) => {
        let key = item.district.name
        if (!map[key]) {
          map[key] = {
            title: key,
            pinyin: item.district.pinyin,
            items: []
          }
        }
        map[key].items.push(item)
      })
      let ret = []
      for (let key in map) {
        let val = map[key]
        ret.push(val)
      }
      ret.sort((a, b) => {
        return a.pinyin.charCodeAt(0) - b.pinyin.charCodeAt(0)
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus">
  .cinema
    position: absolute
    top: 100px
    left: 0px
    width: 750px
    min-height: 90%
    overflow: hidden
    background-color: #f9f9f9
    z-index:3
</style>
