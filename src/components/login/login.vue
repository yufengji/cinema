<template>
  <div class="login">
    <m-header></m-header>
    <div class="handle-height"></div>
    <div class="form">
      <div class="form-input">
        <input type="text" placeholder="输入手机号" v-model="tel" @keyup="checkTel($event)" maxlength="11">
        <div class="send-yzm" v-if="vetifyflag" @click="sendCode">
          <a v-if="!sendresult" href="javascript:;">发送验证码</a>
          <span v-if="sendresult" href="javascript:;">{{yzmtip}}</span>
          <i class="angle"></i>
        </div>
      </div>
      <div class="form-input">
        <input type="password" v-model="pwd" placeholder="输入验证码/密码">
      </div>
      <div class="form-input" v-if="imgcode.url">
        <input type="text" v-model="codeval" placeholder="输入图形验证码">
        <img class="imgcode" :src="imgcode.url" />
      </div>
      <p class="msg-error">{{error}}</p>
      <div class="form-submit">
        <a href="javascript:;" @click="login">登录</a>
      </div>

    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header/header'
import {code, loginValideta, captcha} from '@/api/login.js'
import {setCookie, getCookie} from '@/common/js/cookie.js'
import {mapMutations, mapGetters} from 'vuex'
export default {
  components: {
    MHeader
  },
  computed: {
    ...mapGetters([
      'goseats',
      'scheduleid'
    ])
  },
  data () {
    return {
      vetifyflag: false,
      tel: '',
      type: '2',
      code: false,
      pwd: '',
      error: '',
      imgcode: {
        url: '',
        key: ''
      },
      codeval: '',
      yzmtip: '发送验证码',
      sendresult: false
    }
  },
  created () {
    this.SET_CITY(getCookie('cityName'))
    this.SET_TITLE('登录')
  },
  methods: {
    checkTel () {
      let val = event.currentTarget.value
      if ((/^[1][3,4,5,7,8][0-9]{9}$/.test(val))) {
        this.vetifyflag = true
      } else {
        this.vetifyflag = false
      }
    },
    sendCode () {
      code(this.tel, this.type).then((res) => {
        if (res.status === 0) {
          this.code = true
          this.sendresult = true
          this.cutDown()
          return
        }
        if (res.status === -23107) {
          this.error = res.msg
          this.sendresult = false
          return
        }
      })
    },
    cutDown () {
      let time = 60
      let timer = setInterval(() => {
        time--
        if (time <= 0) {
          this.sendresult = false
          clearInterval(timer)
        }
        this.yzmtip = `${time}秒后重发`
      }, 1000)
    },
    login () {
      if (!this.vetifyflag) {
        this.error = '请输入正确手机号或邮箱'
        return
      }
      if (this.pwd === '') {
        this.error = '密码不能为空'
        return
      }
      loginValideta(this.codeval, this.imgcode.key, this.tel, this.pwd).then((res) => {
        if (res.status !== 0) {
          this.error = res.msg
          if (res.status === -23117) {
            captcha().then((res) => {
              if (res.status === 0) {
                this.imgcode.url = res.data.url
                this.imgcode.key = res.data.key
              }
            })
          }
          return
        } else if (res.status === 0) {
          setCookie('isMainAccount', res.data.data.isMainAccount, 1 / 24)
          setCookie('mobile', res.data.data.mobile, 1 / 24)
          setCookie('sessionKey', res.data.data.sessionKey, 1 / 24)
          setCookie('userId', res.data.data.id, 1 / 24)
          setCookie('userName', res.data.data.name, 1 / 24)
          if (!this.goseats) {
            // 跳转到我的中心
            this.SET_TITLE('我的')
            this.$router.push({
              path: '/center'
            })
          } else {
            // 跳转到选择座位 通过场次id选择座位
            this.$router.push({
              name: 'scheduleDetail',
              params: {scheduleid: this.scheduleid}
            })
            console.log(this.scheduleid)
          }
        }
      })
    },
    ...mapMutations({
      SET_TITLE: 'SET_TITLE',
      SET_CITY: 'SET_CITY'
    })
  }
}
</script>
<style scoped lang="stylus">
  .login
    width: 750px
    min-height: 100%
    overflow: hidden
    background-color: #f6f6f6
    .form
      padding: 0 60px
      margin-top: 60px
    .form-input
      width: 100%
      margin-bottom: 20px
      position: relative
      input
        display: block
        width: 90%
        height: 70px
        padding: 12px 5%
        font-size: 32px
        color: #555
        background-color: #f6f6f6
        background-image: none
        border-bottom: 1px solid #ccc
      .send-yzm
        width: 190px
        position: absolute
        right: 10px
        top: 10px
        background-color: #29a097
        height: 60px
        line-height: 60px
        text-align: center
        border-radius: 6px
        cursor: pointer
        a,span
          display: block
          width: 100%
          height: 100%
          color: #fff
        .angle
          left: -12px
          position: absolute
          top: 15px
          content: ''
          width: 0
          height: 0
          border-top: solid 12px transparent
          border-bottom: solid 12px transparent
          border-right: solid 12px #29a097
          display: block
      .imgcode
        position: absolute
        top: 10px
        right: 5px
        width: 200px
        height: 60px

    .form-submit
      margin-top: 130px
      a
        display: block
        width: 400px
        height: 80px
        line-height: 80px
        background-color: #fe8233
        color: #fff
        border: none
        border-radius: 72px
        margin: 45px auto 0 auto
        font-size: 30px
        outline: none
        text-align: center
    .msg-error
      color: #f00
      font-size: 28px
      height: 40px
</style>
