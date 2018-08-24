<template>
  <div class="statistics-wrap" v-if="user.follownum">
    <div class="statistics-item">
      <span class="statistics-num">{{user.follownum || 0}}</span>
      <span class="statistics-name">粉丝数</span>
    </div>
    <div class="statistics-item">
      <span class="statistics-num">{{user.videoNum || 0}}</span>
      <span class="statistics-name">视频已发布数</span>
    </div>
    <div class="statistics-item">
      <span class="statistics-num">{{user.playNum || 0}}</span>
      <span class="statistics-name">视频播放量</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  .statistics-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .statistics-item {
      width: 243px;
      height: 150px;
      box-shadow:0 2px 4px 0 $color-shadow;
      background-color: $color-background;
      border-radius: 4px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .statistics-num {
        font-size: 44px;
        color: $color-theme;
        margin-bottom: 14px;
        // font-weight: 600;
      }
      .statistics-name {
        font-size: 16px;
        color: $color-text;
      }
    }    
  }
</style>
