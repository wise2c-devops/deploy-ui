import {get, post} from '../utils/rest'
import API from '../utils/rest'
import {pop, popWarn} from '../utils/alert'
export const showLoading = function ({ dispatch }, success = null) {
  dispatch('UPDATE_LOADING', true)
  if (success !== null) success()
  //强制清除 loading
  setTimeout(() => {
    dispatch('UPDATE_LOADING', false)
  }, 20000)

}

export const hideLoading = function ({ dispatch }, success = null) {
  setTimeout(() => {
    dispatch('UPDATE_LOADING', false)
    if (success !== null) success()
  }, 500)
}

export const fetchClusters = ({dispatch}, success = ()=> {}) => {
  get(API.CLUSTERS).then((response) => {
    dispatch('UPDATE_CLUSTERS', response.body)
    success()
  }).catch(() => {
    popWarn('获取集群失败')
  })
}

export const createCluster = ({dispatch}, cluster, success = ()=>{}) => {
  post(API.CLUSTERS, cluster).then((response) => {
    dispatch('ADD_CLUSTER', response.body)
    pop("创建集群成功")
    success()
  }).catch(() => {
    popWarn('创建新集群失败')
  })
}

export const updateCluster = ({dispatch}, cluster, success = ()=> {}) => {
  dispatch('UPDATE_CLUSTER', cluster)
  success()
}
export const deleteCluster = ({dispatch}, index, success = ()=> {}) => {
  dispatch('DELETE_CLUSTER', index)
  success()
}
