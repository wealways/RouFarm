import React from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`

const Detail = ({route}) =>{

  return (
    <Wrapper>
      <Text>디테일 페이지!</Text>
      <Text>{route.params.date}</Text>
    </Wrapper>
  )
}

export default Detail;