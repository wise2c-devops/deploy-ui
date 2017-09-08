import Vue from 'vue'
import Vuex from 'vuex'
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
    console.log(cluster)
  },
  DELETE_CLUSTER(state, index) {
    state.clusters.splice(index, 1)
  }

}

export default new Vuex.Store({
  state,
  mutations,
  modules: {}
})
