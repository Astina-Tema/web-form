module.exports = {
  publicPath: '../pension-form/',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
			// title属性
      title: '学员入学登记表',
    },
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://192.168.5.160/WS/ws/Ws.asmx',
        target: 'http://47.105.130.252/AstinaERPWS/AstinaWs.asmx',
        // target: 'http://192.168.5.160/AstinaWS/astinaws.asmx',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
    },
  },
}