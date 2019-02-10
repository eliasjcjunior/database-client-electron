const withLess = require('@zeit/next-less');
const withImages = require('next-images');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

module.exports = withImages(withLess({
  webpack: config => Object.assign(config, {
    target: 'electron-renderer',
  }),
  exportPathMap: async function () {
    return {
      '/connection-manager': { page: '/connectionManager' },
      '/connections-settings': {
        page: '/connections/connection-settings'
      },
      '/home': { page: '/home' }
    }
  },
  module: {
    exprContextCritical: false
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  }
}));