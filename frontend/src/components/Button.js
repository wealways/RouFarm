import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background: ${(props) => (props.bgColor ? 'red' : 'blue')};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  margin: 8px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const Button = ({ title, bgColor, onPress }) => (
  <Container onPress={onPress} bgColor={bgColor}>
    <ButtonText>{title}</ButtonText>
  </Container>
);
