import superagent from 'superagent'
import superagentJsonapify from 'superagent-jsonapify'
import { formatString } from './string'
import API from './rest'

superagentJsonapify(superagent)

export default {
  CLUSTERS: "/v1/clusters",
  CLUSTER: {
    DETAIL: "/v1/clusters/$1",
    HOSTS: "/v1/clusters/$1/hosts",
    COMPONENTS: "/v1/clusters/$1/components",
    HOST_DETAIL: "/v1/clusters/$1/hosts/$2",
    COMPONENT:  "/v1/clusters/$1/components/$2",
    DEPLOY: "/v1/clusters/$1/deployment",
    LOGS: "/v1/clusters/$1/logs",
    STATUS: "/v1/clusters/$1/status"
  },
  COMPONENT_PROPERTIES: "/v1/components/$1/properties"
}


export const get = function (url, queryParam = {}) {
  return superagent.get(process.env.HTTP_HOST + url).use(unauthorizedRedirect).query(queryParam).timeout(30000)
}

export const post = function (url, params) {
  return superagent.post(process.env.HTTP_HOST + url).use(unauthorizedRedirect).send(params).timeout(30000)
}

export const put = function (url, params) {
  return superagent.put(process.env.HTTP_HOST + url).use(unauthorizedRedirect).send(params).timeout(30000)
}

export const destroy = function (url, params) {
  return superagent.delete(process.env.HTTP_HOST + url).use(unauthorizedRedirect).send(params).timeout(30000)
}

export const postWithoutAuth = function (url, params) {
  return superagent.post(process.env.HTTP_HOST + url).send(params).timeout(30000)
}

export const getRancherIcon = function (envId, name) {
  return process.env.HTTP_HOST + formatString(API.RANCHER.CATALOG_ICON, envId, name)
}

const unauthorizedRedirect = (req) => {
  req.on('response', function (res) {
    if (res.status === 401) {
      // localStorage.removeItem('user')
      // localStorage.setItem('expired', true)
      console.warn('do something...')
      window.location.reload()
    }
  })
}
