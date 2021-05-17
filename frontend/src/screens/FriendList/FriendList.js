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


function Friendlist({ navigation }) {


  const title = '제목'
  const URL = 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=1018023613188393'
  const pathURI = 'chart?cht=qr&chs=200x200&chl=1018023613188393'

  // QR 공유하기
  const shareQR = () => {
    pushQR(title, URL, pathURI)
  };
  // 링크 메세지 보내기
  const shareLink = () => {
    pushReport("규수", pathURI)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => shareLink()} style={styles.button}>
        <Text style={styles.buttonText}>메세지 보내기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => shareQR()} style={styles.button}>
        <Text style={styles.buttonText}>QR 보내기</Text>
      </TouchableOpacity>
    </View>
  );
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


export default Friendlist;