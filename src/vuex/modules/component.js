import {get} from '../../utils/rest'
import API from '../../utils/rest'
import {formatString} from '../../utils/string'
import {popWarn} from '../../utils/alert'

const state = {
  properties: [],
  versions: []
}

const mutations = {
  // SET_PROPERTIES(state, properties){
  //   state.properties = properties
  // },
  SET_VERSIONS(state, versions) {
    state.versions = versions
  },
  SET_PROPERTIES(state, properties, obj) {
    properties.forEach((item) => {
      if(item.type === 'host') {
        if (obj.isEdit) {
          const hosts = obj.component.hosts[item.variable].map(item=>item.id)
          return item[item.variable] = hosts
        }
        item[item.variable] = []
      }else if (item.type === 'bool') {
        item[item.variable] = obj.isEdit? obj.component.properties[item.variable]: true
        return
      }
      item[item.variable] = obj.isEdit? obj.component.properties[item.variable]: ''
    })
    state.properties = properties
  }
}

export default {
  state,
  mutations
}

// export const fetchComponentProperties = ({dispatch}, componentName, success = () => {}) => {
//   get(formatString(API.COMPONENT_PROPERTIES, componentName)).then(response => {
//     dispatch('SET_PROPERTIES', JSON.parse(response.text))
//     success()
//   }).catch(error => {
//     dispatch('SET_PROPERTIES', [])
//     popWarn(`获取 ${componentName}组件属性失败`)
//     console.error(error)
//   })
// }

export const fetchComponentVersions = ({dispatch}, componentName, success = () => {}) => {
  get(formatString(API.COMPONENT.VERSIONS, componentName)).then(response => {
    dispatch('SET_VERSIONS', JSON.parse(response.text))
    success()
  }).catch(error => {
    popWarn(`获取 ${componentName}版本信息失败`)
    console.error(error)
  })
}

export const fetchVersionProperties = ({dispatch}, componentName, version, obj, success = () => {}) => {
  get(formatString(API.COMPONENT.PROPERTIES, componentName, version)).then(response => {
    dispatch('SET_PROPERTIES', JSON.parse(response.text), obj)
    success()
  }).catch(error => {
    dispatch('SET_PROPERTIES', [])
    popWarn(`获取 ${componentName}组件属性失败`)
    console.error(error)
  })
}

export const resetProperties = ({dispatch}) => {
  dispatch('SET_PROPERTIES', [])
}


export const getComponentProperties = (state) => {
  return state.component.properties
}
export const getComponentVersions = (state) => {
  return state.component.versions
}
