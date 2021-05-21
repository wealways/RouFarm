// 메인페이지
import Main from './views/Main/Main.vue'
// 공유하기
import Share from './views/Share/Share.vue'

export default [
  // 메인 부분 - 애플리케이션 소개
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  // 공유하기 부분
  {
    path: '/:user_id',
    name: 'Share',
    component: Share,
  },
]