<template>
  <div class="container">
    <p-header></p-header>
    <div class="content-wrap">
      <div class="content-inner">
        <sidebar></sidebar>
        <div class="content-right">
          <statistics></statistics>  
          <router-view />
        </div>
      </div>
    </div>
    <p-footer></p-footer>
  </div>
</template>

<script>
import PHeader from 'components/p-header/p-header'
import PFooter from 'components/p-footer/p-footer'
import Sidebar from 'components/sidebar/sidebar'
import Statistics from 'base/statistics/statistics'
export default {
  components: {
    PHeader,
    PFooter,
    Sidebar,
    Statistics
  }
}
</script>

<style lang="scss">
  
</style>
