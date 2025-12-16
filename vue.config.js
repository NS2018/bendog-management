module.exports = {
    devServer: {
      port: 8081, 
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // 后端地址
          changeOrigin: true,
          secure:false,
          pathRewrite: {
            '^/api': '' // 保持路径不变（根据你后端接口调整）
          }
        }
      }
    }
  };