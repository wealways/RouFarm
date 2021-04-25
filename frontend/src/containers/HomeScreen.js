import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, ScrollView, Text, Animated } from 'react-native';

import QRCode from '@/components/animations/QRCode.js';
import Carrot from '@/components/animations/Carrot.js';

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
  position: absolute;
  right: 0;
  bottom: 0;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
`;

const HideButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: ${(props) => (props.open ? props.order * 66 + 'px' : 0)};
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
  z-index: ${(props) => (props.open ? 1 : -1)};
`;

function HomeScreen({ navigation }) {
  const [open, setOpen] = useState(false);

  console.log(open);
  return (
    <View style={{ flex: 1, backgroundColor: '#5c7152' }}>
      <ScrollView>
        <Contents>
          <Carrot />
        </Contents>
        <Contents></Contents>
      </ScrollView>
      <QRCodeButton
        onPress={() => {
          navigation.navigate('QR');
          console.log('Click Button');
        }}>
        <QRCode />
      </QRCodeButton>

      <ButtonWrapper
        onPress={() => {
          setOpen(!open);
        }}>
        <Text>Button</Text>
      </ButtonWrapper>
      <HideButton
        onPress={() => {
          navigation.navigate('Report');
        }}
        order={1}
        open={open}>
        <Text>Report</Text>
      </HideButton>
      <HideButton order={2} open={open}>
        <Text>Settings</Text>
      </HideButton>
    </View>
  );
}

export default HomeScreen;
