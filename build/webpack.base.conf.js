var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      vue: 'vue/dist/vue.js',
      'src': path.resolve(__dirname, '../src'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'services': path.resolve(__dirname, '../src/services'),
      'vuexPath': path.resolve(__dirname, '../src/vuex'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'common': path.resolve(__dirname, '../src/components/common'),
      'components': path.resolve(__dirname, '../src/components'),
      'constants': path.resolve(__dirname, '../src/constants')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    noParse: /.npminstall\/localforage\/1.4.3\/localforage\/dist\/localforage.js/,    
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            sourceMap: process.env.NODE_ENV === 'production' ?
              config.build.productionSourceMap :
              config.dev.cssSourceMap,
            extract: process.env.NODE_ENV === 'production'
          })
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        type: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'production' ?
                config.build.productionSourceMap :
                config.dev.cssSourceMap
            }
          }
        ]
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders(),
    compilerOptions: {
      preserveWhitespace: false
    }
  }
}
