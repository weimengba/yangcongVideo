import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'iview/dist/styles/iview.css'
import 'normalize.css'
import { getCookie } from 'common/js/utils'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Axios.defaults.withCredentials = true
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // if(to.path === '/login') {
  //   console.log(to.path)
  //   if(localStorage.getItem('access_token')) {
  //     next({
  //       path: '/index'
  //     })
  //   }
  // }
  if(to.meta.requireAuth && !store.state.token) {
    // console.log(localStorage.getItem('access_token'))
    if(getCookie('_memberid') && localStorage.getItem('access_token')) {
      next()
    }else {
      next({ 
        path: '/login'
      })
    }
  }else {
    next()
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

