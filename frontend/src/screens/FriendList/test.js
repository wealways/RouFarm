import React, { Component } from 'react';
import RNKakaoLink from 'react-native-kakao-links';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { pushQR, pushReport } from '../../utils/KakaoLink';


function Test({ navigation }) {
  console.log('here!')
  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 240,
    height: 48,
    backgroundColor: "#afafaf",
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
  }
});


export default Test;