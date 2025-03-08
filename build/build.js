const path = require('path')
const { execSync } = require('child_process')
const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

// Ensure NODE_ENV is set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

console.log(`Building with NODE_ENV=${process.env.NODE_ENV}`)

const spinner = ora('Building for production...')
spinner.start()

// Clean dist directory
try {
  execSync('rm -rf dist')
  execSync('mkdir -p dist')
} catch (err) {
  console.error('Error cleaning dist directory:', err)
  process.exit(1)
}

// Copy static assets
execSync('cp -R static/* dist/')

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  spinner.stop()
  
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    process.exit(1)
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
    process.exit(1)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })
  )

  console.log('\nBuild complete!')
  console.log('Files output to:', path.resolve(__dirname, '../dist'))
})
