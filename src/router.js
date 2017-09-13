import VueRouter from 'vue-router'
export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: require('./components/IndexPage.vue')
    },
    {
      path: '/clusters',
      name: "clusters",
      component: require('./components/Clusters.vue')
    },
    {
      path: '/hosts',
      component: require('./components/Hosts.vue')
    },
    {
      path: '/globalConfig',
      component: require('./components/GlobalConfig.vue')
    },
    {
      path: '/process',
      component: require('./components/Process.vue')
    },
    {
      path: '/clusters/:id',
      component: require('./components/ClusterBase.vue'),
      children: [
        {
          name: "hosts",
          path: 'hosts',
          component: require('./components/Hosts.vue')
        },
        {
          path: 'components',
          name: "components",
          component: require('./components/Components.vue')
        }
      ]
    },
    {
      path: "*",
      component: require('./components/404.vue')
    }

  ]
})
