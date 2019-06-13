import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue' // svg组件

// 全局注册
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./components', true, /\.svg$/)
requireAll(req)
