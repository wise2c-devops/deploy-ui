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
  DELETE_CLUSTER(state, index) {
    state.clusters.splice(index, 1)
  }
}

const actions = {
  fetchClusters({ commit }) {
    // Add your API call here
    const clusters = [] // Replace with actual data
    commit('UPDATE_CLUSTERS', clusters)
  },
  createCluster({ commit }, cluster) {
    // Add your API call here
    commit('ADD_CLUSTER', cluster)
  },
  deleteCluster({ commit }, { id, index }) {
    // Add your API call here
    commit('DELETE_CLUSTER', index)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    cluster: Cluster,
    component: Component
  }
})
