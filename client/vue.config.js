module.exports = {
  transpileDependencies: ['vuetify'],
  // devServer options dont belong into `configureWebpack`
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: 'http://k4c105.p.ssafy.io',
  },
};
