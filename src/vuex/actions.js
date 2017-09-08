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
  dispatch('UPDATE_CLUSTERS', [{
    id: 1,
    name: "DevOps",
    description: ""
  }, {
    id: 22,
    name: "平安 POC",
    description: ""
  }])
  success()
}

export const createCluster = ({dispatch}, cluster, success = ()=>{}) => {
  dispatch('ADD_CLUSTER', cluster)
  success()
}

export const updateCluster = ({dispatch}, cluster, success = ()=> {}) => {
  dispatch('UPDATE_CLUSTER', cluster)
  success()
}
export const deleteCluster = ({dispatch}, index, success = ()=> {}) => {
  dispatch('DELETE_CLUSTER', index)
  success()
}
