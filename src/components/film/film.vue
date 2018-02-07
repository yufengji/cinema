<template>
  <div class="film">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="film-list-wrap">
      <div class="film-list-nav">
        <router-link to="now-playing">
          <span>正在热映</span>
        </router-link>
        <router-link to="coming-soon">
          <span>即将上映</span>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {getCookie} from '@/common/js/cookie.js'
import {mapMutations} from 'vuex'
export default {
  components: {
    MHeader
  },
  created () {
    this.SET_CITY(getCookie('cityName'))
  },
  methods: {
    ...mapMutations({
      SET_CITY: 'SET_CITY'
    })
  }
}
</script>
<style scoped lang="stylus">
  .film-list-wrap
    padding-left: 30px
    padding-right: 30px
    background-color: #f9f9f9
    width: 690px
    min-height: 100%
    .film-list-nav
      height: 92px
      margin: 0 auto
      border-bottom: solid #fe6e00 1px
      span
        display:inline-block
        float: left
        width: 50%
        height: 100%
        text-align: center
        font-size: 32px
        line-height: 92px
        color: #6a6a6a
        cursor: pointer
        &.choosing
          color: #fe6e00
          border-bottom: solid
      .router-link-active
        span
          color: #fe6e00
          border-bottom: solid
</style>
