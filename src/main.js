import Vue from 'vue'

import App from './App'
import loadingMixin from './mixin/loading'

import VueRouter from 'vue-router'
import router from './router'
import "spinkit/css/spinners/9-cube-grid.css"
import moment from 'moment'
import Element from 'element-ui'
import VeeValidate from 'vee-validate'
import ZH from './components/lang/zh'
import EN from './components/lang/en'
import FR from './components/lang/fr'
import './assets/wise-icons/css/fontello.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import {getDocmentTitle, getDefaultLang} from 'utils/string'

Vue.prototype.$config = Vue.prototype.$config || require('../config/sysconfig.json')
Vue.use(Element)

// if(process.env.NODE_ENV==='production') {
//   Vue.config.devtools = false
//   Vue.config.productionTip = false
// }


Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueI18n)

const defaultLang = getDefaultLang()
const i18n = new VueI18n({
  locale: defaultLang, // 语言标识
  messages: {
    'zh': ZH,
    'en': EN,
    'fr': FR
  }
})

router.beforeEach((to,from,next) => {
  document.title = `Kubernetes ${getDocmentTitle(defaultLang)}`
  next()
})

router.afterEach(() => {
  //do something
})


//全局可取
window.vue = new Vue({
  el: '#app',
  router,
  i18n,
  mixins: [loadingMixin],
  render: h => h(App),
  data: {
    eventHub: new Vue()
  },
  created() {
    this.showLoading()
  },
  mounted() {
    this.hideLoading()
  }
})


moment.locale('zh-cn')
