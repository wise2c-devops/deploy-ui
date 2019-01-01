var merge = require('webpack-merge')

module.exports = merge({}, {
  NODE_ENV: '"production"',
  HTTP_HOST: '""',
  FEATURE_DEPLOY_PIPELINE: false,
  FEATURE_SERVICE_BINDING: true,
  FEATURE_REGISTRY: true,
  FEATURE_PIPELINE: true,
  FEATURE_REGISTRY_NAMESPACE: false,
  FEATURE_CLOUD: true,
  FEATURE_CHART: '',
  PUSHER_KEY: '',
  TYPE_ENV:'"K8S"'
})
