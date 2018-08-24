<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  body,
  html {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    line-height: 1;
    min-height: 100vh;
    background-color: #fff;
    color: #333;
  }
  .container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    .content-wrap {
      min-width: 1000px;
      flex: 1;
      background-color: #f5f5f5;
      padding-bottom: 20px;
    }
    .content-inner {
      width: 1000px;
      margin: 0 auto;
      margin-top: 20px;
      display: flex;
    }
    .content-right {
      width: 770px;
      overflow: hidden;
    }
  }
</style>
