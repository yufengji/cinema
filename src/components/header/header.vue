<template>
  <div class="header">
    <div class="h-title">
      <div class="toolbar-title-icon">
        <i class="iconfont icon-zhankai1"></i>
      </div>
      <div class="toolbar-title">
        卖座电影
      </div>
    </div>
    <div class="nav-right">
      <a href="javascript:;" class="city">
        <span class="city-content">厦门</span>
        <i class="iconfont icon-zhankai"></i>
      </a>
      <a href="javascript:;" class="user">
        <i class="iconfont icon-yonghu"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {

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
