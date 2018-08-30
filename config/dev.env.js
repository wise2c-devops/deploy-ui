var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	WEBSOCKET_HOST: '"ws://172.20.3.1:8080"',
	HTTP_HOST: '"http://10.0.0.100:88"'
})