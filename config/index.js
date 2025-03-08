// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  production: {
    env: {
      NODE_ENV: '"production"',
      HTTP_HOST: '""',
      WEBSOCKET_HOST: '"ws://192.168.9.10:8080"',
      FEATURE_DEPLOY_PIPELINE: false,
      FEATURE_SERVICE_BINDING: true,
      FEATURE_REGISTRY: true,
      FEATURE_PIPELINE: true,
      FEATURE_REGISTRY_NAMESPACE: false,
      FEATURE_CLOUD: true,
      FEATURE_CHART: '"KUBERNETES"',
      PUSHER_KEY: '"kubernetes"',
      TYPE_ENV:'"K8S"'
    }
  },
  workflow: {
    env: require('./workflow.env')
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  }
}
