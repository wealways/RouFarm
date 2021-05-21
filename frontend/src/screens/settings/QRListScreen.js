import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient'
//api
import { instance } from '@/api';
import jwtContext from '@/contexts/jwt';
//kakao
import { pushQR } from '@/utils/KakaoLink';

const Btn = styled.TouchableOpacity`
  padding:10px;
  background: #2c5061;
  border-radius:10px;
`



const QRListScreen = () => {

  //jwt
  const { JWT } = useContext(jwtContext);
  const [QRList, setQRList] = useState([])

  const _onPress = (qr) => {
    console.log(qr)
    const qrEndPoint = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${qr.uuid}`;
    const qrPath = `chart?cht=qr&chs=200x200&chl=${qr.uuid}`;
    pushQR(qr.questName, qrEndPoint, qrPath);
  }

  useEffect(() => {
    instance.get(`routine/`, {
      headers: {
        Authorization: JWT.jwt,
      },
    }).then(res => {

      setQRList(res.data)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <LinearGradient
      // colors={['#dce8ef', '#fff']}
      colors={['#fffaec', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Text style={{ margin: 10, fontSize: 30 }}>QR 리스트</Text>
        {QRList.length !== 0 &&
          <View style={{ margin: 10, justifyContent: 'center' }}>
            {QRList.map((qr, idx) => (
              <View key={idx} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{qr.questName}</Text>
                <Btn onPress={() => _onPress(qr)}><Text style={{ color: 'white' }}>내보내기</Text></Btn>
              </View>
            ))}
          </View>
        }
        {QRList.length === 0 &&
          <Text> QRCode가 존재하지 않습니다. </Text>
        }
      </ScrollView>
    </LinearGradient>
  )
}

export default QRListScreen;