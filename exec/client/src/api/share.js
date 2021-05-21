import http from './http';
import axios from 'axios';

// 공유하기
export function shareMyInfo(user_id) {
  console.log(user_id)
  return http.get(`profileWeb/grass/${user_id}`)
}

export async function shareMyInfomation(user_id) {
  try {
    let url = "api/profileWeb/";
    let options = {
      method: "GET",
      url: url + `${user_id}`,
    };
    return await axios(options);
  } catch (e) {
    console.error(e);
    console.log("here");
  }
}