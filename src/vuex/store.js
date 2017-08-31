import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  apps: [],
  loading: false
}

const mutations = {
  UPDATE_LOADING (state, status) {
    state.loading = status
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {}
})
