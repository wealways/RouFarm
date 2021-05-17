import axios from 'axios';
import { Config } from '@/config';
import AsyncStorage from '@react-native-community/async-storage';

async function http () {

  const JWT = await AsyncStorage.getItem('JWT').then((value)=>{
    return 'hi JWT'
  });

  const instance = await axios.create({
    baseURL: Config.API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 3000,
  });

  await instance.interceptors.request.use(function(config) {
    if (JWT !== null) {
      config['headers'] = {
        Authorization : JWT
      };
    }
    return config;
  });

  return await instance
}



export default http;