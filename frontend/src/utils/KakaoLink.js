// kakao link 라이브러리
import RNKakaoLink from 'react-native-kakao-links';

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
    const options = {
      objectType: 'custom', //required
      templateId: '53263', //required
      templateArgs: {
        title: 'RouFarm',
        description: `${nickname}님의 루틴 관리 정보가 도착했습니다`,
        imageURL: 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=1018023613188393',
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
