import {get, post, destroy } from '../utils/rest'
import API from '../utils/rest'
import {popWarn} from '../utils/alert'
import {formatString} from '../utils/string'
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
    popWarn('errGetCluster')
  })
}

export const createCluster = ({dispatch}, cluster, success = ()=>{}) => {
  post(API.CLUSTERS, cluster).then((response) => {
    dispatch('ADD_CLUSTER', response.body)
    success()
  }).catch(() => {
    popWarn('errAddCluster')
  })
}

export const updateCluster = ({dispatch}, cluster, success = ()=> {}) => {
  dispatch('UPDATE_CLUSTER', cluster)
  success()
}
export const deleteCluster = ({dispatch}, id, index, success = ()=> {}) => {
  destroy(formatString(API.CLUSTER.DETAIL, id), {}).then(() => {
    dispatch('DELETE_CLUSTER', index)
    success()
  }).catch(() => {
    popWarn('errDeleteCluster')
  })
}
