import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
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

function selectMode({ route, navigation }) {
  // 모드 변경 감지
  const [modes, setModes] = useState('');
  // 닉네임
  const [nickname, setNickname] = useState('');

  // 모드 설명
  const soft = '소프트 모드는 개인의 선택에 따라 서비스의 모든 기능을 취사 선택하여 이용할 수 있습니다';
  const hard = '하드 모드는 루틴 만들기에 실패하는 사용자들을 위해 준비한 모드로 강력한 알람과 알림 기능을 제공합니다';
  // 모드 변경 클릭 시
  const selectSoft = () => {
    setModes(soft);
  };

  const selectHard = () => {
    setModes(hard);
  };

  // 회원가입 상태 시 가져올 정보
  if (route) {
    const signupProfile = route.params;
    // useEffect로 관리
    useEffect(() => {
      setNickname(signupProfile.nickname)
      console.log(signupProfile)
    })
  }

  return (
    <Wrapper>
      <Text>닉네임: {nickname}</Text>
      {/* 닉네임 선택 */}
      <Content1>
        <Title>닉네임을 입력해주세요</Title>
        <NicknameInput
          value={nickname}
        />
      </Content1>
      {/* 모드 선택 */}
      <Content2>
        <Title>모드 선택하기</Title>
        <ModeList>
          <TouchableOpacity onPress={selectSoft}>
            <SoftMode
              source={require('../../assets/images/slave1.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={selectHard}>
            <HardMode
              source={require('../../assets/images/slave1.png')} />
          </TouchableOpacity>
        </ModeList>
        {/* 각 모드 설명 */}
        <Subtitle>{modes}</Subtitle>
        {/* 완료버튼 */}
        <Submit>
          <SubmitText>완료</SubmitText>
        </Submit>
      </Content2>
    </Wrapper >
  );
}

// 메인 배경
const Wrapper = styled.View`
  flex:1;
  background: #f4f4f4;
`;

// 닉네임 선택 - 질문
const Content1 = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin: 15px;
  margin-left: 30px;
  margin-bottom: 15%;
`;
// 닉네임 입력창
const NicknameInput = styled.TextInput`
  height: 40px;
  margin-left: 8px;
  margin-right: 8px;
  border: #55f27c 2px;
  border-radius: 14px;
  background: #e8e8e8;
`;
// 모드 선택
const Content2 = styled.View`
  flex: 2;
  justify-content: flex-start;
  margin: 30px;
  margin-top: 15px;
`;

// 선택지 질문
const Title = styled.Text`
  font-size: 18px;
  font-family: "NotoSansKR-Regular";
  color: #606c80;
  margin-bottom: 10px;
`;
// 모드 리스트
const ModeList = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
// 모드 이미지 스타일
const SoftMode = styled.Image`
  background: pink;
  width: 150px;
  height: 150px;
  /* border: #55f27c 5px;  */
  border-radius: 100px;
  margin-bottom: 20px;
`;
const HardMode = styled.Image`
  background: red;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-bottom: 20px;
`;
// 모드 설명 스타일
const Subtitle = styled.Text`
  margin: 20px;
  font-size: 14px;
`;
// 완료 버튼
const Submit = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  align-items: center;
  background: #55f27c;
  width: 60px;
  height: 30px;
  border-radius: 10px;
`;
const SubmitText = styled.Text`
  color: #fff;
`;
export default selectMode;
