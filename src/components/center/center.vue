<template>
  <div class="center">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="top">
      <div class="user-msg">
        <img class="avatar" :src="user.avatorUrl" />
        <div class="detail">
          <p>{{user.name}}</p>
          <p>ID：{{user.id}}</p>
          <a href="javascript:;" @click="exit">退出</a>
        </div>
      </div>
    </div>
    <div class="menu-contain">
      <div class="menu-wrapper">
        <span>影票订单</span>
        <div class="pull-right">
          <span>{{user.orderCount}} 张</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="menu-wrapper">
        <span>影票待付订单</span>
        <div class="pull-right">
          <span>{{user.preorderCount}} 张</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="menu-wrapper">
        <span>商城订单</span>
        <div class="pull-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="menu-wrapper cash">
        <span>我的现金券</span>
        <div class="pull-right">
          <span v-if="user.wallet">{{user.wallet.coin}} 张</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="menu-wrapper yue">
        <span>账户余额</span>
        <div class="pull-right">
          <span v-if="user.wallet">{{user.wallet.couponCount}} 张</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="menu-wrapper ka">
        <span>我的卖座卡</span>
        <div class="pull-right">
          <span v-if="user.wallet">{{user.wallet.cardCount}} 张</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
      <div class="menu-wrapper">
        <span>设置</span>
        <div class="pull-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {deleteCookie, getCookie} from '@/common/js/cookie.js'
import {me} from '@/api/user.js'
export default {
  components: {
    MHeader
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    this._isLogin()
    this._getMe()
  },
  methods: {
    _isLogin () {
      if (!getCookie('isMainAccount')) {
        this.$router.push({
          path: '/login'
        })
      }
    },
    _getMe() {
      me().then((res) => {
        if (res.status === 0) {
          this.user = res.data.user
        }
      })
    },
    exit () {
      deleteCookie('isMainAccount')
      deleteCookie('mobile')
      deleteCookie('sessionKey')
      deleteCookie('userId')
      deleteCookie('userName')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style scoped lang="stylus">
  .center
    width: 750px
    min-height: 100%
    overflow: hidden
    background: #f9f9f9
  .top
    background-color: #303030
    color: #fff
    overflow: hidden
    .user-msg
      padding: 72px 24px 48px 10%
      overflow: hidden
      .avatar
        width: 200px
        height: 200px
        border-radius: 50%
        margin-right: 24px
        float: left
      .detail
        float: left
        margin-top: 32px
        font-size: 28px
        p
          margin-bottom: 20px
        a
          color: #ffbd80
          margin-top: 0
          text-decoration: underline
  .menu-wrapper
    width: 90%
    margin: 24px 0
    line-height: 120px
    background-color: #fff
    cursor: pointer
    font-size: 28px
    color: #222
    padding:0 5%
    .pull-right
      float: right
      .iconfont
        font-size: 28px
        margin-left: 10px
      span
        color: #e7a858
  .cash
    margin-bottom: 0
    border-bottom: solid 1px #eaeaea
  .yue
    margin: 0
    border-bottom: solid 1px #eaeaea
  .ka
    margin-top: 0
</style>
