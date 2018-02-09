<template>
  <div class="cinema-list">
    <div class="list" v-for="(item, index) in cinema" :key="index" ref="ListGroup">
      <div class="title" @click="showCinema(index)">
        {{item.title}}
      </div>
      <div class="content">
        <div class="cinema-wrap" v-for="item2 in item.items" :key="item2.id">
          <div class="top" @click="showEvent(item2, $event)">
            <div class="cinema-wrap-left">
              <h6>{{item2.name}}</h6>
              <p>{{item2.address}}</p>
              <p>距离未知 <span v-if="showpflag">| 剩余{{item2.avaliableSchedule}}场</span></p>
            </div>
            <div class="cinema-wrap-right">
              <strong v-if="showpflag">￥{{item2.minimumPrice}}</strong>
            </div>
          </div>
          <div class="bottom" v-if="item2.schedule || item2.noschedule">
            <schedule :schedule="item2.schedule" :noschedule="item2.noschedule"></schedule>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="!cinema.length"></loading>
  </div>
</template>
<script>
import {addClass, hasClass, removeClass} from '@/common/js/dom.js'
import Loading from '@/base/loading/loading'
import Schedule from '@/components/cinema-list/schedule'
export default {
  components: {
    Loading,
    Schedule
  },
  data () {
    return {
    }
  },
  props: {
    cinema: {
      type: Array,
      default () {
        return []
      }
    },
    filmid: {
      type: [Number, String],
      default: 0
    },
    showpflag: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showCinema (index) {
      let _element = this.$refs.ListGroup[index].getElementsByClassName('content')[0]
      let _cinemaWrap = _element.getElementsByClassName('cinema-wrap')
      let _height = 0
      for (let i = 0; i < _cinemaWrap.length; i++) {
        _height += _element.getElementsByClassName('cinema-wrap')[i].offsetHeight
      }
      let _h = 0
      if (hasClass(_element, 'show')) {
        _h = 0
        removeClass(_element, 'show')
      } else {
        _h = _height
        addClass(_element, 'show')
      }
      _element.style.height = _h + 'px'
    },
    showEvent (item) {
      this.$emit('showSchdule', item)
    }
  }
}
</script>
<style scoped lang="stylus">
  .cinema-list
    width: 750px
    .list
      margin-bottom: 1.5px
      .title
        height: 95px
        line-height: 95px
        font-size: 28px
        padding-left: 30px
        background: #e1e1e1
        color: #636363
        cursor: pointer
      .content
        background: #ffffff
        height: 0px
        overflow: hidden
        transition: height 0.4s linear
        .cinema-wrap
          padding: 30px 30px
          cursor: pointer
          border-bottom: 1px solid #e1e1e1
          .top
            overflow: hidden
            .cinema-wrap-left
              width: 75%
              float: left
              cursor: pointer
              overflow: hidden
              h6
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                display: inline-block
                vertical-align: text-top
                font-size: 32px
                margin-bottom: 20px
                width: 100%
                font-weight: normal
                margin-right: 6px
              p
                display: inline-block
                font-size: 28px
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                width: 100%
                color: #ccc
                line-height: 45px
            .cinema-wrap-right
              width: 25%
              float: right
              text-align: right
              strong
                font-size: 32px
                color: #fc8637
</style>
