<template>
  <div class="footer-wrap">
    <router-link tag="span" class="footer-item" to="">关于洋葱视频</router-link>
    <router-link tag="span" class="footer-item" to="">用户协议</router-link>
    <router-link tag="span" class="footer-item" to="">侵权投诉</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  .footer-wrap {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: $color-background;
    text-align: center;
    font-size: 0;
    .footer-item {
      color: $color-text-d;
      font-size: 14px;
      &+.footer-item {
        padding-left: 10px;
        border-left: 1px solid $color-text-d;
        margin-left: 10px;
      }
    }
  }
</style>
