import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

// 카카오 공유하기
import { pushReport } from '../../utils/KakaoLink';

// axios
import axios from 'axios';

function commonLoading({ navigation }) {
  // userInfo state
  const [userID, setUserID] = useState('')
  const [userNickname, setUserNickname] = useState('')
  // set함수 끝
  const [push, setPush] = useState(true)

  useEffect(() => {
    // 1. 토큰 가져와서 유저 정보 조회
    AsyncStorage.getItem('JWT').then((JWT) => {
      // 유저정보 axios 요청 보내기
      getUserInfo(JWT).then((res) => {
        const nickname = res.data.profile.nickname
        const id = res.data.id
        pushReport(nickname, id)
        navigation.reset({ routes: [{ name: 'Home' }] });
      })
      // pushReport(userNickname, userID)
    })
    // setPush(false)
    // 3. 메인페이지로 이동
    // setTimeout(() => {
    // }, 1000)
    return () => {
      // pushReport(userNickname, userID)
    }
  }, [])

  // useEffect(async () => {
  //   // 2. 자랑하기 func 작동시키기
  //   await pushReport(userNickname, userID)
  //   console.log('여러번 발생')
  // }, [push])

  // 사용자 정보 가져오는 함수
  const getUserInfo = async (JWT) => {
    try {
      let url = 'http://k4c105.p.ssafy.io/api/user/';
      let options = {
        method: 'GET',
        url: url,
        headers: {
          Authorization: JWT,
        },
      };
      let response = await axios(options);
      console.log(response)
      setUserID(response.data.id)
      setUserNickname(response.data.profile.nickname)
      // return [response.data.nickname, response.data.profile.id]
      return response
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container>
      <ActivityIndicator size="large" color="#2c5061" />
    </Container>
  )
}

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
  background-color: #FFFAEC; 
`
const StyledText = styled.Text`
  font-size:${({ size }) => size}px;
  color: #2c5061;
  margin-top:10px;
`

export default commonLoading;