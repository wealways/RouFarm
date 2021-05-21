import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// router 사용하기
import VueRouter from 'vue-router';
import routes from './routes';

Vue.config.productionTip = false

Vue.use(VueRouter);

// 히스토리 모드 사용
export const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  //앞으로가기 뒤로가기시 해당 스크롤 위치 기억
  //native와 유사하게 동작
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
