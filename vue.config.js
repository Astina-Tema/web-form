module.exports = {
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
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite:{
          '^/api':'http://localhost:3000'
        }
      },
    },
  },
}