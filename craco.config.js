module.exports = {
  // 开发服务器配置
  devServer: {
    // 激活代理服务器，实现允许跨域
    proxy: {
      "/api": {
        target: "https://fanyi-api.baidu.com", 
        changeOrigin: true, 
      },
    },
  },
};
  