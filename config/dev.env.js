var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // HTTP_HOST: '"http://118.178.189.41"',
  // HTTP_HOST: '"http://182.140.210.217"',
  HTTP_HOST: '"http://121.40.232.51:30307"',
  WS_HOST: '"http://101.37.26.244"',
  TERMINAl_WS_HOST:'"ws://182.140.210.217"',
  // HTTP_HOST: '"http://182.140.210.214"',
  FEATURE_DEPLOY_PIPELINE: true,
  FEATURE_SERVICE_BINDING: true,
  FEATURE_REGISTRY_NAMESPACE: false,
  FEATURE_REGISTRY: true,
  FEATURE_PIPELINE: true,
  FEATURE_CHART: '"PROMETHEUS"',
  FEATURE_CLOUD: true,
  PUSHER_KEY: '"wisecloud"',
  PUSHER_HOST: '"121.40.232.51"',
  TYPE_ENV:'"K8S"'
})
