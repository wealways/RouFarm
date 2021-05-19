import React from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Loading = () => {

  return (
    <Container>
      <ActivityIndicator size="large" color="#2c5061" />
      <StyledText size={20}>데이터 가져오는 중</StyledText>
    </Container>
  )
}

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`
const StyledText = styled.Text`
  font-size:${({size}) => size}px;
  color: #2c5061;
`

export default Loading;