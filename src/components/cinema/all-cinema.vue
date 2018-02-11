<template>
  <div class="all-cinema">
    <m-header></m-header>
    <div class="handle-height"></div>
    <cinema-list :cinema="cinema" :showpflag="false" @showSchdule="showSchdule"></cinema-list>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import CinemaList from '@/components/cinema-list/cinema-list.vue'
import {areacinema} from '@/api/cinema.js'
import {mapMutations} from 'vuex'
export default {
  created () {
    this.SET_TITLE('全部影院')
    this._getAreaCinema()
  },
  components: {
    MHeader,
    CinemaList
  },
  data () {
    return {
      cinema: []
    }
  },
  methods: {
    _getAreaCinema () {
      areacinema().then((res) => {
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
    },
    showSchdule (item) {
      console.log(item)
      this.$router.push({
        name: 'detailcinema',
        params: {
          cinemaid: item.id
        }
      })
    },
    ...mapMutations({
      SET_TITLE:'SET_TITLE'
    })
  }
}
</script>
<style lang="stylus" scoped></style>
