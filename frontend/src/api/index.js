import axios from 'axios';
import handleError from './utils/handleError';
import { Config } from '../config';

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

// get/post 등의 응답 전 인터셉트하여 결과확인
instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status });
  },
);

export default instance;
