import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: require('../components/IndexPage.vue').default,
    },
    {
      path: '/clusters',
      name: 'clusters',
      component: require('../components/Clusters.vue').default,
    },
    {
      path: '/hosts',
      component: require('../components/Hosts.vue').default,
    },
    {
      path: '/globalConfig',
      component: require('../components/GlobalConfig.vue').default,
    },
    {
      path: '/clusters/:id',
      component: require('../components/ClusterBase.vue').default,
      children: [
        {
          name: 'hosts',
          path: 'hosts',
          component: require('../components/Hosts.vue').default,
        },
        {
          path: 'components',
          name: 'components',
          component: require('../components/Components.vue').default,
        },
        {
          path: 'logs',
          name: 'logs',
          component: require('../components/Logs.vue').default,
        },
      ],
    },
    {
      path: '/clusters/:id/processing',
      component: require('../components/Process.vue').default,
    },
    {
      path: '*',
      component: require('../components/404.vue').default,
    },
    // {
    //   path: '/contact',
    //   component: require('../components/Contact.vue')
    // }

  ],
})
