import Vue from 'vue'
import axios from 'axios'

import App from './App'
// import router from './router'
// import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(require('element-ui'))

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(App)
})
