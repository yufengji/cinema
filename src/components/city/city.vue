<template>
  <div class="city">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="list" v-for="(item, index) in city.slice(0, 1)" :key="index" ref="hotGroup">
      <div class="title">
        {{item.title}}
      </div>
      <div class="city-container">
        <ul>
          <li v-for="item2 in item.items" :key="item2.id" @click="setCity(item2)">{{item2.name}}</li>
        </ul>
      </div>
    </div>
    <div class="list" v-for="(item, index) in city.slice(1, 2)" :key="'nav'+index" ref="navGroup">
      <div class="title">
        {{item.title}}
      </div>
      <div class="city-container">
        <ul>
          <li v-for="(item2, index2) in item.items" :key="item2.id" @click="goToCity(index2)">{{item2.name}}</li>
        </ul>
      </div>
    </div>
    <div class="list" v-for="(item, index) in city.slice(2,city.length)" :key="'city'+index" ref="listGroup">
      <div class="title">
        {{item.title}}
      </div>
      <div class="city-container">
        <ul>
          <li v-for="item2 in item.items" :key="item2.id" @click="setCity(item2)">{{item2.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {city} from '@/api/city.js'
import {down} from '@/common/js/scrollTo.js'
import {setCookie, getCookie} from '@/common/js/cookie.js'
import {mapMutations} from 'vuex'
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
    this.listHeight = []
    this._getCity()
    this._setMCookie()
  },
  watch: {
    city () {
      setTimeout(() => {
        this._calculaterHeight()
      }, 20)
    }
  },
  methods: {
    _setMCookie () {
      setCookie('cityId', 34, 1)
      if (getCookie('cityName')) {
        setCookie('cityName', getCookie('cityName'), 1)
      } else {
        setCookie('cityName', '厦门', 1)
      }
      setCookie('gr_user_id', 'efa2b4ac-6328-4e30-a864-b29b0ba39b49', 1)
      setCookie('gr_session_id_929dfc63e100d573', '39610c21-ee8b-43eb-a5ca-7326dcc9458a', 1)
      setCookie('co', 'maizuo', 1)
      setCookie('UM_distinctid', '161461a758f126-05370819dc14b3-574e6e46-25800-161461a7590768', 1)
      setCookie('CNZZDATA1254948863', '1737149624-1517296854-https%253A%252F%252Fwww.baidu.com%252F%7C1517640618', 1)
    },
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
        if (item.id === 13 || item.id === 12 || item.id === 11 || item.id === 10) {
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
      let navMap = [{
        title: '按字母排序',
        items: [
          {id: 1000, name: 'A'},
          {id: 1001, name: 'B'},
          {id: 1002, name: 'C'},
          {id: 1003, name: 'D'},
          {id: 1004, name: 'E'},
          {id: 1005, name: 'F'},
          {id: 1006, name: 'G'},
          {id: 1007, name: 'H'},
          {id: 1009, name: 'J'},
          {id: 1010, name: 'K'},
          {id: 1011, name: 'L'},
          {id: 1012, name: 'M'},
          {id: 1013, name: 'N'},
          {id: 1015, name: 'P'},
          {id: 1016, name: 'Q'},
          {id: 1017, name: 'R'},
          {id: 1018, name: 'S'},
          {id: 1019, name: 'T'},
          {id: 1022, name: 'W'},
          {id: 1023, name: 'X'},
          {id: 1024, name: 'Y'},
          {id: 1025, name: 'Z'}
        ]
      }]
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
      return hot.concat(navMap, ret)
    },
    _calculaterHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      const hot = this.$refs.hotGroup
      const nav = this.$refs.navGroup
      let height = hot[0].clientHeight + nav[0].clientHeight
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    goToCity (index) {
      down(this.listHeight[index])
    },
    setCity (item) {
      setCookie('cityId', item.id, 1)
      setCookie('cityName', item.name, 1)
      this.SET_TITLE('卖座电影')
      this.SET_CITY(item.name)
      this.$router.push({path: '/'})
    },
    ...mapMutations({
      SET_TITLE: 'SET_TITLE',
      SET_CITY: 'SET_CITY'
    })
  }
}
</script>
<style scoped lang="stylus">
  .list
    width:750px
    .title
      width: 720px
      height: 80px
      padding-left: 30px
      font-size: 28px
      line-height: 80px
      background-color: #ebebeb
    .city-container
      width: 100%
      overflow: hidden
      ul
        font-size:0
        li
          width: 25%
          text-align: center
          font-size: 32px
          line-height: 90px
          cursor: pointer
          color: #838383
          border-bottom: #ebebeb 1px solid
          display: inline-block
</style>
