module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    // other webpack options to merge in ...
  },
  // devServer options dont belong into `configureWebpack`
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: 'http://k4c105.p.ssafy.io',
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
};
