// kakao link 라이브러리
import RNKakaoLink from 'react-native-kakao-links';

// 카카오 로그아웃
import { logout } from '@react-native-seoul/kakao-login';
// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// QR코드 보내기
export async function pushQR(routineTitle, imageURI, path) {
  try {
    const options = {
      objectType: 'custom', //required
      templateId: '53707', //required
      templateArgs: {
        title: routineTitle,
        imageURL: imageURI,
        // 버튼명
        button: 'QR 코드 보기',
        // 버튼 뒤 주소(parameter)
        path: path,
      },
      // 앱으로 이동 버튼 클릭 시
      url: 'http://k4c105.p.ssafy.io:8080',
    };
    const response = await RNKakaoLink.link(options);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

// 내 기록 자랑하기
export async function pushReport(nickname, path) {
  try {
    console.log(nickname, '닉네임')
    console.log(path, 'path')
    const options = {
      objectType: 'custom', //required
      templateId: '53263', //required
      templateArgs: {
        title: 'RouFarm',
        description: `${nickname}님의 루틴 관리 정보가 도착했습니다`,
        imageURL: 'https://i.imgur.com/l0HxNlH.png',
        // 버튼명
        button: '자세히 보기',
        // 버튼 뒤 주소(parameter)
        path: path,
      },
      // 앱으로 이동 버튼 클릭 시
      url: 'http://k4c105.p.ssafy.io:8080',
    };
    const response = await RNKakaoLink.link(options);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

// 카카오 로그아웃
export async function roufarmlogout(navigation) {
  console.log('here')
  // 1. 카카오 로그아웃
  try {
    const message = await logout();
    console.log(message, 'here')
    // 2. asyncstorage 비워주기
    AsyncStorage.clear()
    // 2-1. 조회하기
    const isClear = AsyncStorage.getAllKeys()
    console.log(isClear)
    // 3. 로그인화면으로 이동시키기
    navigation.navigate('Login')
  } catch (e) {
    console.error(e)
  }
}