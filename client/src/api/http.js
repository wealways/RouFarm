import axios from 'axios';

// axios 구성을 만들 때 구성 기본 값
const instance = axios.create({
  BASEURL: '/api/'
});

// CORS 해결
// instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";


function handleError({ message, data, status }) {
  return Promise.reject({ message, data, status });
}

// get/post 등의 응답 전 인터셉트하여 결과확인
instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status });
  },
);

export default instance;