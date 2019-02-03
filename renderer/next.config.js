const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withLess({
  webpack: config => Object.assign(config, {
    target: 'electron-renderer'
  }),
  exportPathMap: async function () {
    return {
      '/home': { page: '/home' }
    }
  },
  module: {
    exprContextCritical: false
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  }
})