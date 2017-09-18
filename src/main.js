import Vue from 'vue'

import App from './App'

import VueRouter from 'vue-router'
import router from './router'
import $ from 'jquery'
import "spinkit/css/spinners/9-cube-grid.css"
import moment from 'moment'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VeeValidate from 'vee-validate'


Vue.prototype.$config = Vue.prototype.$config || require('../config/sysconfig.json')
Vue.use(Element)

// if(process.env.NODE_ENV==='production') {
//   Vue.config.devtools = false
//   Vue.config.productionTip = false
// }


Vue.use(VueRouter)
Vue.use(VeeValidate)

router.beforeEach((to,from,next) => {
  document.title ="WiseCloud 部署中心"
  next()
})

router.afterEach(() => {
  //do something
})



new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})


moment.locale('zh-cn')

window.jQuery = window.$ = $
require('bootstrap')
$.fn.modal.Constructor.prototype.enforceFocus = function() {}
