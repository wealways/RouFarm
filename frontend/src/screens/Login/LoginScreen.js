import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

// styled-components
import styled from 'styled-components/native';

// kakao symbol - svg
import { WithLocalSvg } from 'react-native-svg';
import kakaoSymbol from '@/assets/images/Kakao_symbol.svg';

// 카카오 로그인 활용하기
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  // 엑세스 토큰 정보
  getAccessToken as getKakaoAccessToken,
  KakaoAccessTokenInfo,
} from '@react-native-seoul/kakao-login';

// axios
import axios from 'axios';

/*
// 카카오 로그인
const signInWithKakao = async () => {
  const token: KakaoOAuthToken = await login();

  setResult(JSON.stringify(token));
};
// 카카오 로그아웃
const signOutWithKakao = async () => {
  const message = await logout();

  setKakaoInfo({
    token: null,
    profile: null,
  });
  setKakaoAccessTokenInfo(null);
};
// 카카오 프로필 조회
const getProfile = async () => {
  const profile: KakaoProfile = await getKakaoProfile();

  setResult(JSON.stringify(profile));
};
// 카카오 연결 끊기
const unlinkKakao = async () => {
  const message = await unlink();

  setKakaoInfo({
    token: null,
    profile: null,
  });

  setKakaoAccessTokenInfo(null);
};
// 카카오 엑세스 토큰 정보 조회
const getAccessTokenInfo = async () => {
  try {
    const accessTokenInfo: KakaoAccessTokenInfo = await getKakaoAccessToken();
    setKakaoAccessTokenInfo((prev) => {
      prev = { ...kakaoAccessTokenInfo, accessTokenInfo }
      console.log('가지고 있는 엑세스 토큰 정보', prev)
      return prev
    })
  } catch (e) {
    console.log('엑세스 토큰 정보 조회 에러 발생')
    console.error(e)
  }
};
*/

function LoginPage({ navigation }) {

  // 카카오 정보 조회
  const [kakaoInfo, setKakaoInfo] = useState({
    token: null,
    profile: null,
  });

  // 카카오 엑세스 토큰 정보 조회
  const [kakaoAccessTokenInfo, setKakaoAccessTokenInfo] = useState(null);

  // JWTtoken
  const [JWT, setJWT] = useState('');
  // 접속 상태 정보 - 로그인 or 회원가입
  const [userState, setUserState] = useState('');
  // 사용자 정보
  const [userInfo, setUserInfo] = useState(null);

  // 회원 정보 조회 테스트용
  const [getUser, setGetUser] = useState('');

  // 실제 로그인
  const roufarmLogin = async () => {
    // 1. 토큰 발급
    try {
      const token: KakaoOAuthToken = await login();
      setKakaoInfo((prev) => {
        prev = { ...kakaoInfo, token: token }
        console.log('받은 토큰 정보', prev)
        return prev
      });
    } catch (e) {
      console.log('카카오 토큰 발급 실패')
      console.error(e)
    }
    // 2. 프로필 조회
    try {
      const profile: KakaoProfile = await getKakaoProfile();
      setKakaoInfo((prev) => {
        prev = { ...kakaoInfo, profile: profile }
        console.log('받은 프로필 정보', prev)
        return prev
      });
    } catch (e) {
      console.log('카카오 프로필 조회 실패')
      console.error(e)
    }
  };
  /*
    // RN - BE 통신 테스트(로그인 및 회원가입) - fetch
    const test = async () => {
      try {
        let url = 'http://k4c105.p.ssafy.io:8080/api/user';
        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(kakaoInfo.profile)
        };
        console.log(JSON.stringify(kakaoInfo.profile))
        let response = await fetch(url, options);
        // 받은 토큰 정보 가져오기
        console.log(response.body)
        console.log(response)
      } catch (e) {
        console.error(e)
      }
    };
  */
  // RN - BE 통신 테스트(로그인 및 회원가입) - axios
  const test = async () => {
    try {
      let url = 'http://k4c105.p.ssafy.io:8080/api/user';
      let options = {
        method: 'POST',
        url: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(kakaoInfo.profile)
      };
      // request 보낼 정보 확인(카카오 프로필 정보)
      console.log(JSON.stringify(kakaoInfo.profile))
      let response = await axios(options);
      // 받은 토큰, 접속 상태, 사용자 정보 업데이트
      console.log('response')
      console.log(response)
      setJWT(response.data.token)
      setUserState(response.data.msg)
      setUserInfo(response.data.user)
    } catch (e) {
      console.error(e)
    }
  };
  // RN - BE 통신 테스트 (회원 가입 조회 - 정보 가져오기)
  const testGet = async () => {
    try {
      let url = 'http://k4c105.p.ssafy.io:8080/api/user/';
      let options = {
        method: 'GET',
        url: url,
        headers: {
          // body가 없기 때문에 accept, content-type X
          // 헤더에 JWT 추가
          'Authorization': JWT,
        },
      };
      console.log(options, '옵션')
      let response = await axios(options);
      // 테스트용 조회
      setGetUser(JSON.stringify(response.data))
      console.log('response - get(user/)')
      console.log(response)
    } catch (e) {
      console.error(e);
    }
  };

  // RN - BE 통신 테스트 (회원 닉네임 변경 - 정보 가져오기)
  const testPut = async () => {
    try {
      let url = 'http://k4c105.p.ssafy.io:8080/api/user/';
      let options = {
        method: 'PUT',
        url: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          // 헤더에 JWT 추가
          'Authorization': JWT,
        },
        data: {
          nickname: '나야',
          mode: '너야?'
        }
      };
      console.log(options, '옵션')
      let response = await axios(options);
      console.log('response - put(user/)')
      console.log(response)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView>
      <Wrapper>
        {/* App name */}
        <Content1>
          <AppName>Rou
            <Text style={{ color: '#55f27c' }}>Farm</Text>
          </AppName>
          <Subtitle>부지런한 농부의 마음으로 시작하는 루틴 관리</Subtitle>
        </Content1>
        <Text>카카오 정보: {JSON.stringify(kakaoInfo)}</Text>
        <Text>JWT토큰 정보: {JWT}</Text>
        <Text>접속 상태 정보: {userState}</Text>
        <Text>사용자 정보: {JSON.stringify(userInfo)}</Text>
        <Text>get 사용자 정보: {getUser}</Text>
        <Content2>
          {/* App Logo */}
          <Logo
            resizeMode={'contain'}
            source={require('../../assets/images/slave1.png')}></Logo>
          {/* kakao login btn */}
          <Btn onPress={() => roufarmLogin()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>test</BtnText>
          </Btn>
          {/* 로그아웃 */}
          <Btn onPress={() => signOutWithKakao()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>카카오 로그아웃</BtnText>
          </Btn>
          {/* 연결끊기 */}
          <Btn onPress={() => unlinkKakao()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>카카오 연결끊기</BtnText>
          </Btn>
          {/* RN - BE test */}
          {/* post(/user) */}
          <Btn onPress={() => test()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>BE test</BtnText>
          </Btn>
          {/* get(/user/) */}
          <Btn onPress={() => testGet()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>BE test(get)</BtnText>
          </Btn>
          {/* put(/user/) */}
          <Btn onPress={() => testPut()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>BE test(put)</BtnText>
          </Btn>
        </Content2>
      </Wrapper >
    </ScrollView>
  );
}

// 메인 배경
const Wrapper = styled.View`
  flex:1;
  background: #f4f4f4;
`;

// 각 섹션
const Content1 = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
const AppName = styled.Text`
  color: white;
  font-size: 40px;
  font-family: "SHOWG";
  color: #fcc004;
  margin-bottom: 4px;
`;
const Subtitle = styled.Text`
  align-self: center;
  font-size: 12px;
  font-family: "NotoSansKR-Regular";
  color: #606c80;
`;

// 중앙 - 설명, 로고
const Content2 = styled.View`
  flex: 2;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
  margin-top: 40px;
`;
const Logo = styled.Image`
`;
// 카카오 로그인 - 규칙에 따라
const Btn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  margin-top: 40px;
  background: #fee500;
  padding: 15px;
  border-radius: 12px;
  width: 250px;
`;
const Symbol = styled.View`
  width: 5px;
  height: 5px;
`;
const BtnText = styled.Text`
  margin-left: 15px;
  color: #0f0f0f;
`;

export default LoginPage;
