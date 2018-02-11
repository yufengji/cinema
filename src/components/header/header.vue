<template>
  <div class="header">
    <div class="h-title">
      <div class="toolbar-title-icon" @click="showAside">
        <i class="iconfont icon-zhankai1"></i>
      </div>
      <div class="toolbar-title">
        {{title}}
      </div>
    </div>
    <div class="nav-right">
      <a href="javascript:;" class="city" @click="goLink">
        <span class="city-content">{{city}}</span>
        <i class="iconfont icon-zhankai"></i>
      </a>
      <router-link class="user" to="/center">
        <i class="iconfont icon-yonghu"></i>
      </router-link>
    </div>
    <h-aside ref="Asides" v-if="showasideflag"></h-aside>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import HAside from '@/components/aside/aside'
import {getCookie} from '@/common/js/cookie.js'
import {addClass, hasClass, removeClass} from '@/common/js/dom.js'
export default {
  computed: {
    ...mapGetters([
      'title',
      'city'
    ])
  },
  components: {
    HAside
  },
  data () {
    return {
      showasideflag: false
    }
  },
  created () {
    this.SET_CITY(getCookie('cityName'))
  },
  methods: {
    goLink () {
      this.SET_TITLE('选择城市')
      this.$router.push({path: '/city'})
    },
    showAside () {
      this.showasideflag = true
      setTimeout(() => {
        const asideEle = this.$refs.Asides.$el
        if (hasClass(asideEle, 'aside-show')) {
          removeClass(asideEle, 'aside-show')
          setTimeout(() => {
            this.showasideflag = false
          }, 400)
        } else {
          addClass(asideEle, 'aside-show')
        }
      }, 0)
    },
    ...mapMutations({
      SET_TITLE: 'SET_TITLE',
      SET_CITY: 'SET_CITY'
    })
  }
}
</script>
<style scoped lang="stylus">
  .header
    width: 750px
    height: 100px
    line-height: 100px
    background-color: #282828
    position: fixed
    top: 0
    left: 0
    right: 0
    overflow: hidden
    z-index: 99
    .h-title
      float: left
      width: auto
      .toolbar-title-icon
        width: 100px
        height: 100px
        float: left
        text-align: center
        color: #999
      .toolbar-title
        padding: 0 20px
        width: 360px
        float: left
        color: #efefef
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
    .nav-right
      float: right
      a
        color: #999
      .city
        font-size: 28px
        float: left
        padding:0 10px
        i
          font-size: 24px
      .user
        font-size: 32px
        float: left
        width: 100px
        text-align: center
</style>
