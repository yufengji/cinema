<template>
  <div class="swiper" v-if="billboards.length">
    <swipe class="my-swipe" :showIndicators='false'>
      <swipe-item class="slide1" v-for="(item, index) in billboards" :key="index"><img :src="item.imageUrl" /></swipe-item>
    </swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vue-swipe'
require('vue-swipe/dist/vue-swipe.css')
export default {
  components: {
    Swipe,
    SwipeItem
  },
  props: {
    billboards: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style scoped lang="stylus">
  .swiper
    height: 425px
</style>
