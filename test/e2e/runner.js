const { execSync } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../../build/webpack.dev.conf')

const runTests = async () => {
  try {
    const compiler = webpack(webpackConfig)
    const port = process.env.PORT || 8080
    
    const devServer = new WebpackDevServer({
      ...webpackConfig.devServer,
      port,
      open: false
    }, compiler)

    console.log('Starting dev server for testing...')
    await devServer.start()

    console.log('Running e2e tests...')
    execSync('npx nightwatch test/e2e/specs', { stdio: 'inherit' })

    console.log('Stopping dev server...')
    await devServer.stop()
  } catch (error) {
    console.error('Test runner failed:', error)
    process.exit(1)
  }
}

runTests()
