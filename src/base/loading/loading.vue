<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="" class="icon">
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    text-align: center;
    font-size: 0;
    .icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .title {
      margin: 0;
      color: #333;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>


