<template>
  <div class="city">
    <m-header></m-header>
    city
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {city} from '@/api/city.js'
export default {
  components: {
    MHeader
  },
  data () {
    return {
      city: []
    }
  },
  created () {
    this._getCity()
  },
  methods: {
    _getCity () {
      city().then((res) => {
        if (res.status === 0) {
          this.city = this._normallizeCity(res.data.cities)
        }
      })
    },
    _normallizeCity (list) {
      let map = {
        hot: {
          title: '热门城市',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 5) {
          map.hot.items.push(item)
        }
        const key = item.pinyin.slice(0, 1)
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(item)
      })
      // 得到的map对象是无序的，需转为数组进行排序
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>
