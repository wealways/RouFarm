import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://k4c105.p.ssafy.io/api/',
  headers: {
    Authorization: JWT,
  },
});

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
