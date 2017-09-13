import {get, post, destroy} from '../../utils/rest'
import API from '../../utils/rest'
import {formatString} from '../../utils/string'
import {popWarn} from '../../utils/alert'
const state = {
  hosts: [],
  components: []
}

const mutations = {
  SET_HOSTS(state, hosts) {
    state.hosts = hosts
  },
  ADD_HOST(STATE, host) {
    state.hosts.push(host)
  },
  SET_COMPONENTS(state, components) {
    state.components = components
  }
}

export default {
  state,
  mutations
}

export const fetchHosts= ({dispatch}, clusterId, success = () =>{}) => {
  get(formatString(API.CLUSTER.HOSTS, clusterId)).then((response) => {
    dispatch('SET_HOSTS', response.body)
    success()
  }).catch(() => {
    popWarn('获取集群下主机列表失败')
  })
}

export const fetchComponents = ({dispatch}, clusterId, success = () =>{}) => {
  get(formatString(API.CLUSTER.COMPONENTS, clusterId)).then((response) => {
    dispatch('SET_COMPONENTS', response.body)
    success()
  }).catch(() => {
    popWarn('获取集群下服务组件列表失败')
  })
}

export const addHost = ({dispatch}, clusterId, host, success = () =>{}) => {
  post(formatString(API.CLUSTER.HOSTS, clusterId), host).then((response) => {
    dispatch('ADD_HOST', response.body)
    success()
  }).catch(() => {
    popWarn('添加主机失败')
  })
}

export const getHosts = (state) => {
  return state.cluster.hosts
}

const getComponents = (state) => {
  return state.cluster.components
}
