import {get, post, put, destroy} from '../../utils/rest'
import API from '../../utils/rest'
import {formatString} from '../../utils/string'
import {popWarn} from '../../utils/alert'
import {findIndex} from 'lodash'

const state = {
  hosts: [],
  components: [],
  cluster: {
    components: []
  },
  logs: [],
  status: {},
  selectComponents: [],
  types: []
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
  },
  SET_LOGS(state, logs) {
    state.logs = logs
  },
  SET_STATUS(state, status) {
    state.status = status
  },
  RESET_SELECT_COMPONENTS (state, selectComponents) {
    state.selectComponents = selectComponents
  },
  SET_TYPES(state, types) {
    state.types = types
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
    popWarn('errGetHostList')
  })
}

export const fetchComponents = ({dispatch}, clusterId, success = () =>{}) => {
  get(formatString(API.CLUSTER.COMPONENTS, clusterId)).then((response) => {
    dispatch('SET_COMPONENTS', response.body)
    success(response.body)
  }).catch(() => {
    popWarn('errGetCmponentList')
  })
}

export const addHost = ({dispatch}, clusterId, host, success = () =>{}) => {
  post(formatString(API.CLUSTER.HOSTS, clusterId), host).then((response) => {
    dispatch('ADD_HOST', response.body)
    success()
  }).catch(() => {
    popWarn('errAddHost')
  })
}

export const deleteHost = ({dispatch}, clusterId, hostId, index, success = () =>{}) => {
  destroy(formatString(API.CLUSTER.HOST_DETAIL, clusterId, hostId), {}).then( ()=> {
    dispatch('DELETE_HOST', index)
    success()
  }).catch(() => {
    popWarn('errDelHost')
  })
}

export const updateHost = ({dispatch}, clusterId, host, success = ()=>{}) => {
  put(formatString(API.CLUSTER.HOST_DETAIL, clusterId, host.id), host).then((response)=> {
    dispatch('UPDATE_HOST', response.body)
    success()
  }).catch(() => {
    popWarn('errUpdateHost')
  })
}

export const fetchClusterDetail = ({dispatch}, clusterId) => {
  get(formatString(API.CLUSTER.DETAIL, clusterId)).then((response) => {
    dispatch('SET_CLUSTER', response.body)
  }).catch(() => {
    popWarn('errGetCulsterDetail')
  })
}

export const createComponent = ({dispatch}, clusterId, component, success = ()=>{}) => {
  post(formatString(API.CLUSTER.COMPONENTS, clusterId), component).then((response) => {
    dispatch('ADD_COMPONENT', response.body)
    success(response.body)
  }).catch((error) => {
    popWarn('errAddComponent')
    console.error(error)
  })
}

export const deleteComponent = ({dispatch}, clusterId, componentId, index, success = ()=>{}) => {
  destroy(formatString(API.CLUSTER.COMPONENT, clusterId, componentId), {}).then( ()=> {
    dispatch('DELETE_COMPONENT', index)
    success()
  }).catch((error) => {
    popWarn('errDeleteComponent')
    console.error(error)
  })
}

export const updateComponent = ({dispatch}, clusterId, component, success= ()=> {}) => {
  put(formatString(API.CLUSTER.COMPONENT, clusterId, component.id), component).then( (response)=> {
    dispatch('UPDATE_COMPONENT', response.body)
    success()
  }).catch((error) => {
    popWarn('errUpdateComponent')
    console.error(error)
  })
}

export const resetSlectComponents = ({dispatch}, selectComponents) => {
  dispatch('RESET_SELECT_COMPONENTS', selectComponents)
}


export const deploy = ({dispatch}, clusterId, selectComponents, type='install', success=()=>{}) => {
  put(formatString(API.CLUSTER.DEPLOY, clusterId), {operation: type, components: selectComponents}).then(() => {
    success()
  }).catch(error => {
    popWarn('errDeploy')
    console.error(error)
  })
}

export const cancel = ({dispatch}, clusterId, success=()=>{}) => {
  destroy(formatString(API.CLUSTER.DEPLOY, clusterId), {}).then(() => {
    success()
  }).catch(error => {
    popWarn('errDeploy')
    console.error(error)
  })
}

export const fetchLogs = ({dispatch}, clusterId, success = ()=>{}) =>{
  get(formatString(API.CLUSTER.LOGS, clusterId)).then((response) => {
    dispatch('SET_LOGS', response.body)
    success()
  }).catch(error => {
    popWarn('errGetInstallCulsterLog')
    console.error(error)
  })
}

export const fetchClusterStatus = ({dispatch}, clusterId, success = ()=>{}) => {
  get(formatString(API.CLUSTER.STATUS, clusterId)).then(response => {
    dispatch('SET_STATUS', response.body)
    success()
  }).catch(error => {
    popWarn('errGetCulsterState')
    console.error(error)
  })
}

export const fetchComponentProperties = ({dispatch}, clusterId, componentName, success = () => {}) => {
  get(formatString(API.CLUSTER.COMPONENT_PROPERTIES, clusterId, componentName)).then(response => {
    dispatch('SET_COMPONENT', response.body)
    success()
  }).catch(error => {
    popWarn('errGetCulsterState')
    console.error(error)
  })
}

export const fetchComponentTypes = ({dispatch}, success = () => {}) => {
  get(API.CLUSTER.COMPONENT_TYPES).then(response => {
    dispatch('SET_TYPES', response.body)
    success()
  }).catch(error => {
    popWarn('errGetComponentType')
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

export const getLogs = (state) => {
  return state.cluster.logs
}


export const getClusterStatus = (state) => {
  return state.cluster.status
}
