import instance from './index';

// 예시
const getUser = (success, fail) => {
  instance.get('/user').then(success).catch(fail);
};

export { getUser };
