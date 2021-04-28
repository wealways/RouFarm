import React,{useState} from 'react';
import {View, ScrollView,Text,TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';



const Custombox = styled.TouchableOpacity`
  border-radius:5px;
  width:23px;
  height:23px;
  /* background-color:#ebedf0; */
  background-color:${({boxColor}) => boxColor >= 100 ? '#216e39': boxColor >= 50? '#30a14e' : boxColor > 0? '#9be9a8': boxColor ==0?'#ebedf0': boxColor==-1 ?'#ff0101':'#fff'};
  margin:1.8px;
`
const Weekline = styled.View`
  display:flex;
  flex-direction:row;

`



const CustomHeatmapChart = (Monthdata) => {

  // 패키지 안 쓰고 만들기
  const month = [0,1,2,3,4]
  const week = [0,1,2,3,4,5,6]

  const _onPress = (w,d) => {
    console.log(`${w}_${d}클릭\n`)
    console.log(w*7 +d)
    console.log(Monthdata.Monthdata[w*7+d])
    console.log('----')
  }
  
  return (
    <ScrollView>
      <Text>  월    화    수    목    금    토    일</Text>
      <View>
        {month.map((w,wIdx)=>(
          <Weekline key={wIdx}>
            {week.map((d,dIdx) =>(
              <Custombox onPress={() => _onPress(w,d)} key={dIdx} boxColor={Monthdata.Monthdata[w*7+d]}/>
            ))}
          </Weekline>
        ))}
      </View>
    </ScrollView>
  )
};

export default CustomHeatmapChart;