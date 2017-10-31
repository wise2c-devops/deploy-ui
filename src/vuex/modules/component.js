import {get} from '../../utils/rest'
import API from '../../utils/rest'
import {formatString} from '../../utils/string'
import {popWarn} from '../../utils/alert'

const state = {
  properties: []
}

const mutations = {
  SET_PROPERTIES(state, properties){
    state.properties = properties
  }
}

export default {
  state,
  mutations
}

export const fetchComponentProperties = ({dispatch}, componentName, success = () => {}) => {
  get(formatString(API.COMPONENT_PROPERTIES, componentName)).then(response => {
    dispatch('SET_PROPERTIES', response.body)
    success()
  }).catch(error => {
    popWarn(`获取组件:${componentName} 属性失败`)
    console.error(error)
  })
}


export const getComponentProperties = (state) => {
  return state.component.properties
}
