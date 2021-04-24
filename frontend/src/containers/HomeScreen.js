import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';

import QRCode from '@/components/animations/QRCode.js';
import Carrot from '@/components/animations/Carrot.js';

const deviceSize = Dimensions.get('window');

const Contents = styled.View`
  height: 500px;
`;

const QRCodeButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.first};
  border-radius: 8px;
`;

const ButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  color: #4e2e2e;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
`;

const HideButton = styled.View`
  position: absolute;
  background: #5c7152;
  width: 128px;
  height: 128px;
  border-radius: 16px;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

function HomeScreen({ navigation }) {
  const [pressed, setPressed] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: '#5c7152' }}>
      <ScrollView>
        <Contents>
          <Carrot />
        </Contents>
        <Contents>
          <Carrot />
        </Contents>
      </ScrollView>
      <QRCodeButton
        onPress={() => {
          navigation.navigate('QR');
          console.log('Click Button');
        }}>
        <QRCode press={() => {}} />
      </QRCodeButton>
      <ButtonWrapper
        onPress={() => {
          setPressed(true);
        }}>
        <Text>Button</Text>
      </ButtonWrapper>
      {/* <HideButton press={pressed} size={deviceSize}></HideButton> */}
    </View>
  );
}

export default HomeScreen;
