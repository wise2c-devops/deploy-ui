const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.dev.conf')

const compiler = webpack(webpackConfig)
const port = process.env.PORT || 8080

const devServerOptions = {
  ...webpackConfig.devServer,
  open: true,
  historyApiFallback: true,
  client: {
    overlay: {
      errors: true,
      warnings: false
    },
    progress: true
  },
  static: {
    directory: path.join(__dirname, '../static')
  }
}

const server = new WebpackDevServer(devServerOptions, compiler)

const runServer = async () => {
  console.log('Starting dev server...')
  await server.startCallback(() => {
    console.log(`Dev server is running at http://localhost:${port}`)
    console.log('Waiting for initial build...')
  })
}

runServer().catch(err => {
  console.error('Failed to start dev server:', err)
  process.exit(1)
})
