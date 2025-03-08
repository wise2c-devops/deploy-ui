var path = require('path')
var config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function (_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var loaderName = loader.replace(/\?.*$/, '')
      var query = loader.replace(/^[^?]*\??/, '')
      var loaderObj = {
        loader: loaderName + '-loader',
        options: {}
      }
      if (options.sourceMap) {
        loaderObj.options.sourceMap = true
      }
      if (query) {
        loaderObj.options = Object.assign(loaderObj.options, 
          Object.fromEntries(new URLSearchParams(query)))
      }
      return loaderObj
    })

    if (options.extract) {
      return [{ loader: MiniCssExtractPlugin.loader }].concat(sourceLoader)
    } else {
      return [{ loader: 'vue-style-loader' }].concat(sourceLoader)
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
