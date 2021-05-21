import React from 'react';
import styled from 'styled-components/native';

const About = () => {

  return (
    <Container>
      <StyledText size={40} style={{color:'#2c5061'}}>RouFarm</StyledText>
      <StyledText size={15}>Ver.1.0.0</StyledText>
      <StyledText size={15} style={{marginTop:20}}>SSAFY 4기. </StyledText>
      <StyledText size={15}>빈준호, 오수완, 이강림, 최규수, 황승주</StyledText>
    </Container>
  )
}

const Container = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
`
const StyledText = styled.Text`
  font-size:${({size})=>size}px;
`
export default About;