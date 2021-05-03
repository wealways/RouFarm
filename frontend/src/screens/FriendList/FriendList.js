import React, { useState } from 'react';
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

import { CheckBox } from 'react-native-elements';

// 컴포넌트
import QRCodeAnim from '@/components/animations/QRCodeAnim';
import CarrotAnim from '@/components/animations/CarrotAnim';
import NavigationButton from '@/components/common/NavigationButton';

// 리덕스
import ModalContainer from '@/containers/ModalContainer';

// 디바이스 사이즈
import { deviceWidth, deviceHeight } from '@/utils/devicesize';

// kakao symbol - svg
import { WithLocalSvg } from 'react-native-svg';
import kakaoSymbol from '@/assets/images/Kakao_symbol.svg';

function Friendlist({ navigation }) {

  return (
    <View>
      <Text>친구목록 페이지</Text>
    </View>
  );
}

export default Friendlist;
