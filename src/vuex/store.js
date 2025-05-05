import Vue from 'vue'
import Vuex from 'vuex'
import Cluster from './modules/cluster'
import Component from './modules/component'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    clusters: [],
    loading: false
  },
  mutations: {
    SHOW_LOADING(state) {
      state.loading = true
    },
    HIDE_LOADING(state) {
      state.loading = false
    },
    SET_CLUSTERS(state, clusters) {
      state.clusters = clusters
    },
    FETCH_CLUSTERS(state, clusters) {
      state.clusters = clusters
    }
  },
  actions: {
    showLoading({ commit }) {
      commit('SHOW_LOADING')
    },
    hideLoading({ commit }) {
      commit('HIDE_LOADING')
    },
    fetchClusters({ commit }, clusters) {
      commit('FETCH_CLUSTERS', clusters)
    }
  },
  getters: {
    clusters: state => state.clusters,
    loading: state => state.loading
  },
  modules: {
    cluster: Cluster,
    component: Component
  }
})
