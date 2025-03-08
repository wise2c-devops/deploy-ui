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
      var loaderObj = {}
      if (/\?/.test(loader)) {
        loaderObj.loader = loader.replace(/\?/, '-loader?')
        if (options.sourceMap) {
          loaderObj.options = { sourceMap: true }
        }
      } else {
        loaderObj.loader = loader + '-loader'
        if (options.sourceMap) {
          loaderObj.options = { sourceMap: true }
        }
      }
      return loaderObj
    })

    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(sourceLoader)
    } else {
      return ['vue-style-loader'].concat(sourceLoader)
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
      loader: loader
    })
  }
  return output
}
