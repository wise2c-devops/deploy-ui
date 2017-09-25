import {get, post, put, destroy} from '../../utils/rest'
import API from '../../utils/rest'
import {formatString} from '../../utils/string'
import {popWarn} from '../../utils/alert'
import {findIndex} from 'lodash'
const state = {
  hosts: [],
  components: [],
  cluster: {}
}

const mutations = {
  SET_HOSTS(state, hosts) {
    state.hosts = hosts
  },
  ADD_HOST(state, host) {
    state.hosts.push(host)
  },
  DELETE_HOST(state, index) {
    state.hosts.splice(index, 1)
  },
  SET_COMPONENTS(state, components) {
    state.components = components
  },
  UPDATE_HOST(state, host) {
    var index = findIndex(state.hosts, (item) => {
      return item.id === host.id
    })
    state.hosts.splice(index, 1, host)
  },
  SET_CLUSTER(state, cluster){
    state.cluster = cluster
  },
  ADD_COMPONENT(state, component) {
    state.components.push(component)
  },
  DELETE_COMPONENT(state, index) {
    state.components.splice(index, 1)
  },
  UPDATE_COMPONENT(state, component) {
    var index = findIndex(state.components, (item) => {
      return item.id === component.id
    })
    state.components.splice(index, 1, component)
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

export const deleteHost = ({dispatch}, clusterId, hostId, index, success = () =>{}) => {
  destroy(formatString(API.CLUSTER.HOST_DETAIL, clusterId, hostId), {}).then( ()=> {
    dispatch('DELETE_HOST', index)
    success()
  }).catch(() => {
    popWarn('删除主机失败')
  })
}

export const updateHost = ({dispatch}, clusterId, host, success = ()=>{}) => {
  put(formatString(API.CLUSTER.HOST_DETAIL, clusterId, host.id), host).then((response)=> {
    dispatch('UPDATE_HOST', response.body)
    success()
  }).catch(() => {
    popWarn('更新主机失败')
  })
}

export const fetchClusterDetail = ({dispatch}, clusterId) => {
  get(formatString(API.CLUSTER.DETAIL, clusterId)).then((response) => {
    dispatch('SET_CLUSTER', response.body)
  }).catch(() => {
    popWarn('获取集群详情失败')
  })
}

export const createComponent = ({dispatch}, clusterId, component, success = ()=>{}) => {
  post(formatString(API.CLUSTER.COMPONENTS, clusterId), component).then((response) => {
    dispatch('ADD_COMPONENT', response.body)
    success()
  }).catch((error) => {
    popWarn('创建服务组件失败')
    console.error(error)
  })
}

export const deleteComponent = ({dispatch}, clusterId, componentId, index, success = ()=>{}) => {
  destroy(formatString(API.CLUSTER.COMPONENT, clusterId, componentId), {}).then( ()=> {
    dispatch('DELETE_COMPONENT', index)
    success()
  }).catch((error) => {
    popWarn('删除组件失败')
    console.error(error)
  })
}

export const updateComponent = ({dispatch}, clusterId, component, success= ()=> {}) => {
  put(formatString(API.CLUSTER.COMPONENT, clusterId, component.id), component).then( (response)=> {
    dispatch('UPDATE_COMPONENT', response.body)
    success()
  }).catch((error) => {
    popWarn('更新组件失败')
    console.error(error)
  })
}

export const deploy = ({dispatch}, clusterId, type='install', success=()=>{}) => {
  put(formatString(API.CLUSTER.DEPLOY, clusterId), {operation: type}).then(response => {
    success()
  }).catch(error => {
    popWarn('无法执行部署命令，请稍后重试')
    console.error(error)
  })
}

export const cancel = ({dispatch}, clusterId, success=()=>{}) => {
  destroy(formatString(API.CLUSTER.DEPLOY, clusterId), {}).then(response => {
    success()
  }).catch(error => {
    popWarn('无法执行部署命令，请稍后重试')
    console.error(error)
  })
}

//getters

export const getHosts = (state) => {
  return state.cluster.hosts
}

export const getComponents = (state) => {
  return state.cluster.components
}

export const getCluster = (state) => {
  return state.cluster.cluster
}
