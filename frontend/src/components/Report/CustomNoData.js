import React, { useState  } from 'react';
import { View, Text, TouchableOpacity,useWindowDimensions } from 'react-native'
import styled from 'styled-components/native';


const CustomNoData = () => {
  const height = useWindowDimensions().height
  return (
    <View style={{flex:1,padding:5}}>
      <View  style={{height:height/2, marginTop:'auto',marginBottom:'auto',padding:5}}>
        <Text style={{color:'#2c5061',fontSize:30,margin:2}}> 기록이 없네요😅</Text>
        <View style={{display:'flex',flexDirection:'row'}}>
          <Text style={{color:'#2c5061',fontSize:30,margin:2}}> 지금 </Text> 
          <Text style={{color:'#E75B46',fontSize:30,margin:2,marginRight:0}}>루틴 </Text>
          <Text style={{color:'#2c5061',fontSize:30,margin:2,marginLeft:0}}>을 만들고 </Text>
        </View>
        <Text style={{color:'#2c5061',fontSize:30,margin:2,marginBottom:10}}> 바로 달성해보세요.</Text>
        <Text style={{color:'#2c5061',fontSize:15,margin:10,fontWeight:'100'}}>당신의 기록을 바탕으로 월간, 주간 그리고 데일리 리포트를 작성하여 습관을 만드는 데 도움을 드리겠습니다.</Text>
      </View>
    </View>
  )
};

export default CustomNoData;