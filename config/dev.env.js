const { merge } = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WEBSOCKET_HOST: '"ws://192.168.9.10:8080"',
  HTTP_HOST: '"http://10.0.0.100:88"'
})
