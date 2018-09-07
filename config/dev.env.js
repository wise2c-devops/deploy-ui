var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	WEBSOCKET_HOST: '"ws://10.0.0.100:88"',
	HTTP_HOST: '"http://10.0.0.100:88"'
})