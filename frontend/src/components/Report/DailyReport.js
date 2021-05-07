import React from 'react';
import {View,Text,ScrollView} from 'react-native'
import styled from 'styled-components/native';

import { deviceWidth } from '@/utils/devicesize';

const Wrapper = styled.View`
  /* flex:1; */
  /* margin:50px 20px;  */
`

const DailyReport = (yearMonth) => {
  return (
    <Wrapper>
      <View style={{display:'flex',flexDirection:'column',width:deviceWidth-70}}>
        <Text>{yearMonth.yearMonth}</Text>
        <Text>하이</Text>
        <Text>하이</Text>
      </View>
    </Wrapper>
  )
}

export default DailyReport;