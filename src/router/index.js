import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('components/IndexPage.vue')
    },
    {
      path: '/clusters',
      name: 'clusters',
      component: () => import('components/Clusters.vue')
    },
    {
      path: '/hosts',
      component: () => import('components/Hosts.vue')
    },
    {
      path: '/globalConfig',
      component: () => import('components/GlobalConfig.vue')
    },
    {
      path: '/clusters/:id',
      component: () => import('components/ClusterBase.vue'),
      children: [
        {
          name: 'hosts',
          path: 'hosts',
          component: () => import('components/Hosts.vue')
        },
        {
          path: 'components',
          name: 'components',
          component: () => import('components/Components.vue')
        },
        {
          path: 'logs',
          name: 'logs',
          component: () => import('components/Logs.vue')
        },
      ],
    },
    {
      path: '/clusters/:id/processing',
      component: () => import('components/Process.vue')
    },
    {
      path: '*',
      component: () => import('components/404.vue')
    },
    // {
    //   path: '/contact',
    //   component: () => import('components/Contact.vue')
    // }

  ],
})
