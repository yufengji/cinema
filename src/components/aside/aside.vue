<template>
  <div class="aside" ref="Asides">
    <div class="sidebar-container">
      <div class="sidebar-overlay" @click="closeASide"></div>
      <div class="nav">
        <ul>
          <li><router-link to="/home">首页</router-link><i class="iconfont icon-right"></i></li>
          <li><router-link to="/film">影片</router-link><i class="iconfont icon-right"></i></li>
          <li><router-link to="/allcinema">影院</router-link><i class="iconfont icon-right"></i></li>
          <li><router-link to="/center">我的</router-link><i class="iconfont icon-right"></i></li>
          <li><a href="javascript:;">卖座卡</a><i class="iconfont icon-right"></i></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {removeClass} from '@/common/js/dom.js'
export default {
  props: {
    showoverlay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeASide () {
      const asideEle = this.$refs.Asides
      removeClass(asideEle, 'aside-show')
      setTimeout(() => {
        this.showasideflag = false
      }, 400)
    }
  }
}
</script>
<style scoped lang="stylus">
  .aside
    width: 750px
    .sidebar-container
      position: fixed
      top: 100px
      bottom: 0
      left: 0
      right: 0
      color: #9a9a9a
      z-index: 501
      right: 0px
      .sidebar-overlay
        background: rgba(0,0,0,0.5)
        position: absolute
        top: 0px
        right: 0px
        bottom: 0
        left: 0
        transition: all ease 0.4s
        opacity: 0
      .nav
        border-top: 1px solid #222
        box-shadow: 0 1px 1px #363636 inset
        background: #282828
        position: absolute
        display: block
        top: 0;
        right: 750px
        bottom: 0
        left: 0
        overflow: hidden
        transition: all ease 0.4s
        li
          height: 100px
          line-height: 100px
          border-bottom: 1px dotted #333
          position:relative
          a
            display: block
            width: 84%
            height: 100%
            padding: 0 8%
            color: #9a9a9a
            font-size: 28px
          .iconfont
            position: absolute
            right: 5%
            top: 0
  .aside-show
    .sidebar-container
      .sidebar-overlay
        opacity: 1
      .nav
        right: 250px
</style>
