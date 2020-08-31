let config = {
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
  devServer: {
    port: 8888,
    host: "localhost",
    https: false,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        //目标服务器地址
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        }
      }
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    config.externals = {
      "BMap": "BMap"
    }
  },

};
if (process.env.VUE_APP_MOCK) {
  delete config.devServer.proxy
  process.env.VUE_APP_BASE_API = ""
}
module.exports = config