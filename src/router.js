import VueRouter from 'vue-router'
import IndexPage from './components/IndexPage.vue'
import Clusters from './components/Clusters.vue'
import Hosts from './components/Hosts.vue'
import GlobalConfig from './components/GlobalConfig.vue'
import ClusterBase from './components/ClusterBase.vue'
import Components from './components/Components.vue'
import Logs from './components/Logs.vue'
import Process from './components/Process.vue'
import NotFound from './components/404.vue'

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/clusters',
      name: "clusters",
      component: Clusters
    },
    {
      path: '/hosts',
      component: Hosts
    },
    {
      path: '/globalConfig',
      component: GlobalConfig
    },
    {
      path: '/clusters/:id',
      component: ClusterBase,
      children: [
        {
          name: "hosts",
          path: 'hosts',
          component: Hosts
        },
        {
          path: 'components',
          name: "components",
          component: Components
        },
        {
          path: 'logs',
          name: "logs",
          component: Logs
        }
      ]
    },
    {
      path: '/clusters/:id/processing',
      component: Process
    },
    {
      path: "*",
      component: NotFound
    }
    // {
    //   path: '/contact',
    //   component: require('./components/Contact.vue')
    // }

  ]
})
