import React from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient'

const SettingScreen = ({ navigation }) => {
  
  return (
    <LinearGradient
      // colors={['#dce8ef', '#fff']}
      colors={['#fffaec', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{flex:1}}
    >
      <Container>
        <View style={{backgroundColor:'#2c5061',padding:10,borderRadius:10}}>
          <Title>환경 설정</Title>
        </View>
        <ListView>
          <StyledBtn onPress={()=> navigation.navigate('SelectMode')}>
            <StlyedText size={20}>내 정보</StlyedText>
          </StyledBtn>
          <StyledBtn onPress={()=> navigation.navigate('QRList')}>
            <StlyedText size={20}>QRCode 관리</StlyedText>
          </StyledBtn>
          <StyledBtn onPress={()=> navigation.navigate('About')}>
            <StlyedText size={20}>About</StlyedText>
          </StyledBtn>
          <StyledBtn>
            <StlyedText size={20} style={{color:'#E75B46',fontWeight:'bold'}}>로그아웃</StlyedText>
          </StyledBtn>

        </ListView>
      </Container>
    </LinearGradient>
  )
}

const Container = styled.View`
  flex:1;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:20px;
`
const Title = styled.Text`
  font-size:30px;
  color:#fff;
`
const StlyedText = styled.Text`
  font-size:${({size}) => size}px;
`
const ListView = styled.View`
  margin-top:20px;
  justify-content:center;
  align-items:center;
`
const StyledBtn = styled.TouchableOpacity`
  /* border-width:1; */
  padding:10px;
  margin:10px;
`

export default SettingScreen;