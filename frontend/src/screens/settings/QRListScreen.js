import React,{useState,useContext,useEffect} from 'react';
import {View, Text,ScrollView,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient'
//api
import { instance } from '@/api';
import jwtContext from '@/contexts/jwt';

const Btn = styled.TouchableOpacity`
  padding:10px;
  background: #2c5061;
  border-radius:10px;
`



const QRListScreen = () => {

  //jwt
  const {JWT} = useContext(jwtContext);
  const [QRList,setQRList] = useState([])

  useEffect(()=>{
    instance.get(`routine/`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ODYiLCJpYXQiOjE2MjA5NzA0MDcsImV4cCI6MTYyMzU2MjQwN30.CtvAR1QeW4pR_NbF8JU8_YDqrw5aWZAJJ87vQ5l6dgLwImMIestqlFlKWwSKHC4hYhbfX5CUkKpAHcs5-1XwJQ',
        // Authorization: JWT.jwt,
      },
    }).then(res=>{
      console.log('res',res.data)
      setQRList(res.data)
    }).catch(err=>{
      console.error(err)
    })
  },[])

  return (
    <LinearGradient
      // colors={['#dce8ef', '#fff']}
      colors={['#fffaec', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{flex:1}}
    >
      <ScrollView>
        <Text style={{margin:10,fontSize:30}}>QR 리스트</Text>
        {QRList.length!==0 &&
        <View style={{margin:10,justifyContent:'center'}}>
          {QRList.map(qr=>(
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:10,alignItems:'center'}}>
              <Text style={{fontSize:20}}>{qr.questName}</Text>
              <Btn onPress={()=>{
                console.log(qr.uuid)
              }}><Text style={{color:'white'}}>내보내기</Text></Btn>
            </View>
          ))}
        </View>
        }
        {QRList.length===0 &&
          <Text> QRCode가 존재하지 않습니다. </Text>
        }
      </ScrollView>
    </LinearGradient>
  )
}

export default QRListScreen;