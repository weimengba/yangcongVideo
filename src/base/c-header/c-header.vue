<template>
  <div class="c-header">
    <div class="tab-wrap">
      <span class="tab-item" :class="{active: active==index}" v-for="(item, index) in tab" :key="index" @click="tabChange(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Array,
      default: null
    },
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tabChange(index) {
      this.$emit('tabChange', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  .c-header {
    width: 100%;
    height: 60px;
    font-size: 16px;
    color: $color-text;
    border-bottom: 2px solid $color-border;    
    background-color: $color-background;
    .tab-wrap {
      height: 60px;
      padding-left: 40px;
      display: flex;
      align-items: flex-end;
    }
    .tab-item {
      display: inline-block;
      padding-bottom: 15px;
      position: relative;
      cursor: pointer;
      // font-weight: 600;
      &+.tab-item {
        margin-left: 40px;
      }
      &.active {
        color: $color-theme;
        &:after {
          content: '';
          width: 100%;
          height: 2px;
          background-color: $color-theme;
          display: block;
          position: absolute;
          left: 0;
          bottom: -2px;
        }
      }
    }
  }
</style>

