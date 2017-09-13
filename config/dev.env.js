var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  HTTP_HOST: '"http://118.178.189.41:8080"',
})
