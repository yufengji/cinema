<template>
  <div class="cinema">
    <cinema-list :cinema="cinema" :filmid="this.$route.params.id"></cinema-list>
  </div>
</template>
<script>
import {cinema} from '@/api/cinema.js'
import CinemaList from '@/components/cinema-list/cinema-list.vue'
export default {
  created () {
    this._getCinema()
  },
  data () {
    return {
      cinema: []
    }
  },
  components: {
    CinemaList
  },
  methods: {
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
      return ret.sort()
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
