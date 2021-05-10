import React, { Component } from 'react';
import RNKakaoLink from 'react-native-kakao-links';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


const linkObject = {
  webURL: 'https://developers.kakao.com/docs/android/kakaotalk-link',//optional
  mobileWebURL: 'https://developers.kakao.com/docs/android/kakaotalk-link',//optional
  androidExecutionParams: 'shopId=1&itemId=24', //optional For Linking URL
  iosExecutionParams: 'shopId=1&itemId=24', //optional For Linking URL
};


const contentObject = {
  title: '제목',
  link: linkObject,
  imageURL: 'http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',

  desc: '설명',//optional
  imageWidth: 240,//optional
  imageHeight: 240//optional
}

//5개의 속성 중 최대 3개만 표시해 줍니다. 우선순위는 Like > Comment > Shared > View > Subscriber 입니다.
const socialObject = {
  likeCount: 12,//optional
  commentCount: 1,//optional
  sharedCount: 23,//optional
  viewCount: 10,//optional
  subscriberCount: 22//optional
}

const buttonObject = {
  title: '앱으로보기',//required
  link: linkObject,//required
}


const commerceDetailObject = {
  regularPrice: 10000,//required,
  // discountPrice:1000,//Optional
  // discountRate:10,//Optional
  // fixedDiscountPrice:1000//Optional
};


function Friendlist({ navigation }) {

  const linkCustom = async () => {
    try {
      const options = {
        objectType: 'custom',//required
        templateId: '53263',//required
        templateArgs: {
          user: '루팜팀',
          imageURL: 'http://imagescdn.gettyimagesbank.com/500/201904/jv11348625.jpg',

        }
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  }

  const linkScrap = async () => {
    try {
      const options = {
        objectType: 'scrap',//required
        url: 'https://developers.kakao.com',//required
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  }

  const linkText = async () => {
    try {
      const options = {
        objectType: 'text',//required
        text: '텍스트 입력',//required
        link: linkObject,//required
        // buttonTitle:'',//optional buttons랑 사용 불가.
        buttons: [buttonObject]//optional
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  }

  const linkCommerce = async () => {
    try {
      const options = {
        objectType: 'commerce',//required
        content: contentObject,//required
        commerce: commerceDetailObject,//required
        // buttonTitle:'',//optional buttons랑 사용 불가.
        buttons: [buttonObject]//optional
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  }

  const linkLocation = async () => {
    try {
      const options = {
        objectType: 'location',//required
        content: contentObject,//required
        address: '실제 주소',//required
        addressTitle: '우리 집',//optional
        // buttonTitle:'',//optional buttons랑 사용 불가.
        buttons: [buttonObject]//optional
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  }

  const linkList = async () => {
    try {
      const options = {
        objectType: 'list',//required
        headerTitle: '리스트 제목',//required
        headerLink: linkObject,//required
        contents: [contentObject, contentObject],//required
        // buttonTitle:'',//optional buttons랑 사용 불가.
        buttons: [buttonObject]//optional
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);
    } catch (e) {
      console.warn(e);
    }
  }


  const linkFeed = async () => {
    try {
      const options = {
        objectType: 'feed',//required
        content: contentObject,//required
        social: socialObject,//optional
        buttons: [buttonObject]//optional
      };
      const response = await RNKakaoLink.link(options);
      console.log(response);

    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => linkFeed()} style={styles.button}>
        <Text style={styles.buttonText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => linkList()} style={styles.button}>
        <Text style={styles.buttonText}>List</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => linkLocation()} style={styles.button}>
        <Text style={styles.buttonText}>Location</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => linkCommerce()} style={styles.button}>
        <Text style={styles.buttonText}>Commerce</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => linkText()} style={styles.button}>
        <Text style={styles.buttonText}>Text</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => linkScrap()} style={styles.button}>
        <Text style={styles.buttonText}>Scrap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => linkCustom()} style={styles.button}>
        <Text style={styles.buttonText}>Custom</Text>
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