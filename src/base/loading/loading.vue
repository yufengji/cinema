<template>
  <div class="loading">
    <img v-if="hasmore.flag" src="./loading.gif">
    <p class="desc">{{hasmore.tip}}</p>
  </div>
</template>
<script>
export default {
  props: {
    hasmore: {
      type: Object,
      default () {
        return {
          flag: true,
          tip: '正在加载'
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus">
  .loading
    width: 100%
    text-align: center
    padding:30px 0
    img
      width: 48px
      height: 48px
    .desc
      line-height: 40px
      font-size: 24px
      color: #666666
</style>
