import React, { useState,  } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';


const CustomNoData = () => {

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text> 아직 기록이 없습니다.</Text>
      <Text> 루틴을 만들고 달성해보세요.</Text>
    </View>
  )
};

export default CustomNoData;