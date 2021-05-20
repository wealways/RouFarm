import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LodingSplash = ({ navigation }) => {
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

export default LodingSplash;