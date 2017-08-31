import VueRouter from 'vue-router'
export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: require('./components/IndexPage.vue')
    },
    {
      path: '/hosts',
      component: require('./components/Hosts.vue')
    },
    {
      path: '/globalConfig',
      component: require('./components/GlobalConfig.vue')
    }

  ]
})
