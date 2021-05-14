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

import { CheckBox } from 'react-native-elements';

// 컴포넌트
import QRCodeAnim from '@/components/animations/QRCodeAnim';
import CarrotAnim from '@/components/animations/CarrotAnim';
import NavigationButton from '@/components/common/NavigationButton';

// 리덕스
import ModalContainer from '@/containers/ModalContainer';

// 디바이스 사이즈
import { deviceWidth, deviceHeight } from '@/utils/devicesize';

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
} from '@react-native-seoul/kakao-login';

function LoginPage({ navigation }) {
  // state
  const [result, setResult] = useState('');

  // 로그인
  const signInWithKakao = async () => {
    try {
      const token: KakaoOAuthToken = await login();
      console.log(token)
      setResult(JSON.stringify(token));
      console.log(result, 'here')
      console.log(token, 'here')
    } catch (e) {
      console.log(e, 'here');
      console.error(e);
    }
  };

  // 로그아웃
  const signOutWithKakao = async () => {
    try {
      const message = await logout();
      setResult(message);
    } catch (e) {
      console.error(e)
    }
  };

  // 프로필 조회
  const getProfile = async () => {
    try {
      const profile: KakaoProfile = await getKakaoProfile();
      setResult(JSON.stringify(profile));
      console.log(result, 'here')
      console.log(profile, 'here')
    } catch (e) {
      console.error(e)
    }
  };

  // // 연결 끊기
  // const unlinkKakao = async () => {
  //   try {
  //     const message = await unlink();
  //     setResult(message);
  //   } catch (e) {
  //     console.error(e)
  //   }
  // };

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
        <Text>{result}</Text>
        <Content2>
          {/* App Logo */}
          <Logo
            resizeMode={'contain'}
            source={require('../../assets/images/slave1.png')}></Logo>
          {/* kakao login btn */}
          <Btn onPress={() => signInWithKakao()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>카카오 로그인</BtnText>
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
          {/* 프로필 조회 */}
          <Btn onPress={() => getProfile()}>
            <WithLocalSvg
              asset={kakaoSymbol}
              width={15}
              height={20}
              fill={'#000000'} />
            <BtnText>카카오 프로필</BtnText>
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
