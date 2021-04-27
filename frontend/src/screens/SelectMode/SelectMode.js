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

function LoginPage({ navigation }) {

  return (
    <Wrapper>
      {/* 닉네임 선택 */}
      <Content1>
        <Title>닉네임을 입력해주세요</Title>
      </Content1>
      {/* 모드 선택 */}
      <Content2>
        <Title>닉네임을 입력해주세요</Title>
      </Content2>
    </Wrapper >
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
  align-items: flex-start;
  margin: 15px;
  margin-left: 30px;
  background: pink;
`;
// 선택지 질문
const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-family: "NotoSansKR-Regular";
  color: #606c80;
`;
const Subtitle = styled.Text`
  align-self: center;
  font-size: 12;
  font-family: "NotoSansKR-Regular";
  color: #606c80;
`;

// 중앙 - 설명, 로고
const Content2 = styled.View`
  flex: 2;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
  margin-top: 40;
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
