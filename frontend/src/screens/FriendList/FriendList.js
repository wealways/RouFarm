import React, { Component } from 'react';
import RNKakaoLink from 'react-native-kakao-links';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


function Friendlist({ navigation }) {

  const linkCustom = async () => {
    try {
      const options = {
        objectType: 'custom',//required
        templateId: '53263',//required
        templateArgs: {
          title: '제목입니다',
          description: `내용입니다`,
          imageURL: 'http://imagescdn.gettyimagesbank.com/500/201904/jv11348625.jpg',
          // 버튼명
          button: '버튼 제목입니다',
          // 버튼 뒤 주소(parameter)
          path: '1234',
        },
        // 앱으로 이동 버튼 클릭 시 
        url: 'http://k4c105.p.ssafy.io:8080',
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => linkCustom()} style={styles.button}>
        <Text style={styles.buttonText}>메세지 보내기</Text>
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