<template>
  <div class="sidebar-wrap">
    <div class="sidebar-inner">
      <div class="sidebar-list">
        <router-link tag="div" to="/index" class="sidebar-item">
          <span class="item-text">首页</span>
        </router-link>
        <router-link tag="div" to="/upload" class="sidebar-item">
          <!-- <i class="el-icon-upload item-icon"></i> -->
          <span class="item-text">上传视频</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  .sidebar-wrap {
    width: 210px;
    height: 400px;
    background-color: $color-background;
    margin-right: 20px;
    box-shadow: 0 2px 4px 0 rgba(51, 51, 51, .2);
    border: 1px solid $color-border;
    box-sizing: border-box;
    .sidebar-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .sidebar-item {
      width: 188px;
      height: 54px;
      padding-left: 20px;
      background-color: $color-background;
      color: $color-text;
      line-height: 54px;
      font-size: 0;
      cursor: pointer;
      border-bottom: 1px solid $color-border;
      &.router-link-active {
        color: $color-background;
        background-color: $color-theme;
      }
      &:hover {
        background-color: $color-theme;
        color: $color-background;
      }
      .item-text {
        font-size: 16px;
        margin-left: 10px;
      }
      .item-icon {
        font-size: 18px;
      }
    }
  }
</style>
