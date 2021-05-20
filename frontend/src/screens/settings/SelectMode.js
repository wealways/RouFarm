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

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

function selectMode({ navigation }) {
  // 모드 변경 설명
  const [explain, setExplain] = useState('');
  // 닉네임
  const [nickname, setNickname] = useState('');
  // 모드 선택 수정 정보
  const [mode, setMode] = useState('');

  // 모드 설명
  const soft =
    `소프트 모드는 개인의 선택에 따라 서비스의 \n모든 기능을 취사 선택하여 이용할 수 있습니다`;
  const hard =
    `하드 모드는 루틴 만들기에 실패하는 \n사용자들을 위해 준비한 모드로 \n강력한 알람과 알림 기능을 제공합니다`;

  // 모드 변경 클릭 시 보여줄 글자
  const selectExplain = (mode) => {
    // 1. 모드 정보 체크 - 보여줄 설명 선택
    console.log(mode, '현재 모드');
    setMode(mode);
    if (mode === 'hard') {
      setExplain(hard);
    } else if (mode === 'soft') {
      setExplain(soft);
    }
  };

  // API 요청하기
  const getUserInfo = async () => {
    // 1. JWT 토큰을 가져온다
    const JWT = await AsyncStorage.getItem('JWT');
    try {
      let url = 'http://k4c105.p.ssafy.io:8080/api/user/';
      let options = {
        method: 'GET',
        url: url,
        headers: {
          // body가 없기 때문에 accept, content-type X
          // 헤더에 JWT 추가
          Authorization: JWT,
        },
      };
      // 2. 사용자 정보 요청하기
      let response = await axios(options);
      // 3. 받은 정보로 갱신하기
      setNickname(response.data.profile.nickname);
      console.log(response.data.profile.mode, '받은 정보');
      selectExplain(response.data.profile.mode);
    } catch (e) {
      console.error(e);
    }
  };
  // 회원가입 시에는 저장된 정보를 불러와야 한다
  useEffect(() => {
    // 조회 결과 실행하기
    getUserInfo();
    return () => { };
  }, []);

  // 사용자 정보 수정
  const modifyUserInfo = async (newNickname, newMode) => {
    const JWT = await AsyncStorage.getItem('JWT');
    try {
      let url = 'http://k4c105.p.ssafy.io:8080/api/user/';
      let options = {
        method: 'PUT',
        url: url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          // 헤더에 JWT 추가
          Authorization: JWT,
        },
        data: {
          nickname: newNickname,
          mode: newMode,
        },
      };
      console.log(options, '옵션');
      let response = await axios(options);
      // 1. 모드 정보 asyncstorage 초기화
      AsyncStorage.removeItem('mode');
      // 2. 넣어주기
      AsyncStorage.setItem('mode', newMode);
      // 3. 조회해서 확인
      AsyncStorage.getItem('mode', (error, mode) => {
        console.log('접속자 mode 정보', mode);
      });
      console.log('response - put(user/)');
      console.log(response);

      // 수정 완료 후 메인 페이지로 돌려주기
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  // 선택된 속성
  const isSelect = '1px solid black';

  return (
    <Wrapper>
      {/* 닉네임 선택 */}
      <Content1>
        <Title>닉네임을 입력해주세요</Title>
        <NicknameInput
          value={nickname}
          autoCorrect={false}
          onChangeText={(nickname) => setNickname(nickname)}
        />
      </Content1>
      {/* 모드 선택 */}
      <Content2>
        <Title>모드 선택하기</Title>
        <ModeList>
          <TouchableOpacity onPress={() => selectExplain('soft')}>
            <SoftMode
              source={require('../../assets/images/soft.png')} style={{
                backgroundColor: mode === "soft" ? "#2C5061" : "#FFFAEC"
              }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectExplain('hard')}>
            <HardMode source={require('../../assets/images/hard.png')}
              style={{
                backgroundColor: mode === "hard" ? "#2C5061" : "#FFFAEC"
              }} />
          </TouchableOpacity>
        </ModeList>
        {/* 각 모드 설명 */}
        <Subtitle>{explain}</Subtitle>
        {/* 완료버튼 */}
        <Submit onPress={() => modifyUserInfo(nickname, mode)}>
          <SubmitText>완료</SubmitText>
        </Submit>
      </Content2>
    </Wrapper>
  );
}

// 메인 배경
const Wrapper = styled.View`
  flex: 1;
  background: #FFFAEC;
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
  padding:10px;
  border: #2c5061 2px;
  border-radius: 14px;
  background: #e8e8e8;
`;
// 모드 선택
const Content2 = styled.View`
  flex: 3;
  justify-content: flex-start;
  margin: 30px;
  margin-top: 15px;
`;

// 선택지 질문
const Title = styled.Text`
  font-size: 18px;
  font-family: 'NotoSansKR-Bold';
  color: #606c80;
  margin-bottom: 10px;
`;
// 모드 리스트
const ModeList = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
// 모드 이미지 스타일
const SoftMode = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-bottom: 20px;
  border-width: 8px;
  border-color: #2c5061;
`;
const HardMode = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-bottom: 20px;
  border-width: 8px;
  border-color: #2c5061;
`;
// 모드 설명 스타일
const Subtitle = styled.Text`
  font-family: 'NotoSansKR-Medium';
  margin: 20px;
  font-size: 14px;
  text-align: center;
  color: #606c80;
`;
// 완료 버튼
const Submit = styled.TouchableOpacity`
  font-family: 'COPRGTB';
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  align-items: center;
  background: #2c5061;
  width: 80px;
  height: 30px;
  border-radius: 10px;
`;
const SubmitText = styled.Text`
  color: #fff;
`;

export default selectMode;
