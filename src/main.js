import Vue from 'vue'

import App from './App'

import VueRouter from 'vue-router'
import router from './router'
import "spinkit/css/spinners/9-cube-grid.css"
import moment from 'moment'
import Element from 'element-ui'
import VeeValidate from 'vee-validate'
import ZH from './components/lang/zh'
import EN from './components/lang/en'
import './assets/wise-icons/css/fontello.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'

Vue.prototype.$config = Vue.prototype.$config || require('../config/sysconfig.json')
Vue.use(Element)

// if(process.env.NODE_ENV==='production') {
//   Vue.config.devtools = false
//   Vue.config.productionTip = false
// }


Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.getItem('DEPLOYMENT_LANGUAGE')? localStorage.getItem('DEPLOYMENT_LANGUAGE'): 'zh', // 语言标识
  messages: {
    zh: ZH,
    en: EN
  }
})

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
  i18n,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})


moment.locale('zh-cn')
