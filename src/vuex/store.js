import Vue from 'vue'
import Vuex from 'vuex'
import Cluster from './modules/cluster'
import Component from './modules/component'
Vue.use(Vuex)

const state = {

  loading: false,
  clusters: []
}

const mutations = {
  UPDATE_LOADING(state, status) {
    state.loading = status
  },
  UPDATE_CLUSTERS(state, clusters) {
    state.clusters = clusters
  },
  ADD_CLUSTER(state, cluster) {
    state.clusters.push(cluster)
  },
  UPDATE_CLUSTER(state, cluster) {
  },
  DELETE_CLUSTER(state, index) {
    state.clusters.splice(index, 1)
  }

}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    cluster: Cluster,
    component: Component
  }
})
