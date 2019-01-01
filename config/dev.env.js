var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WEBSOCKET_HOST: '"ws://192.168.9.10:8080"',
  HTTP_HOST: '"http://192.168.9.10:88"'
})
