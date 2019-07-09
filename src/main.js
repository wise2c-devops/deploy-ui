import Vue from 'vue'
import router from 'src/router'
import store from 'vuexPath/store'
import '../static/index.js'
import moment from 'moment'
import Element from 'element-ui'
import VeeValidate from 'vee-validate'
import ZH from './lang/zh'
import EN from './lang/en'
import FR from './lang/fr'
import './assets/wise-icons/css/fontello.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import App from './App'
import sysconfig from '../config/sysconfig.json'
import { getDocmentTitle, getDefaultLang } from 'utils/string'


Vue.prototype.$config = Vue.prototype.$config || sysconfig

Vue.use(Element)

// if(process.env.NODE_ENV==='production') {
//   Vue.config.devtools = false
//   Vue.config.productionTip = false
// }


Vue.use(VeeValidate)
Vue.use(VueI18n)

const defaultLang = getDefaultLang()
const i18n = new VueI18n({
  locale: defaultLang,
  messages: {
    zh: ZH,
    en: EN,
    fr: FR,
  },
})

router.beforeEach((to, from, next) => {
  store.dispatch('UPDATE_LOADING', true)
  document.title = `Kubernetes ${getDocmentTitle(defaultLang)}`
  next()
})

router.afterEach(() => {
  store.dispatch('UPDATE_LOADING', false)
})


// 全局可取
export default new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  data: {
    eventHub: new Vue(),
  },
})


moment.locale('zh-cn')
