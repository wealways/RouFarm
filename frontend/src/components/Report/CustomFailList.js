import React, { useState,useEffect,useContext } from 'react';
import { 
  Text, 
  View,
  ScrollView,
  useWindowDimensions,

} from 'react-native';

import styled from 'styled-components/native';
import HeatmapContext from '@/contexts/Report/Heatmap';

const FailView = styled.View`
  flex:1;
  border-bottom-color:#a1a1a1;
  border-bottom-width: 1px;
  border-radius: 1px;
  margin:5px;
  padding:5px;
  display:flex;
  flex-direction:row;
  /* justify-content:space-between; */
  align-items:center;
`

const TagText = styled.Text`
  padding:5px;
  margin-right:10px;
  border-radius:10px;
  background-color:${({name}) => name==="건강" ? "#6f95aa" : name==="자기개발" ? "#0c985e" : name==="일상" ? "#dce8ef" : "#687396"};
  color:${({name}) => name!="일상"?"white":"#000"};
`

const Fail = () => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;


  const {heatmap} = useContext(HeatmapContext)
  const contents = {
    '2021-05-w1':[
      { id: 1, routine: '코딩 테스트 문제 풀기1', tag:'자기개발' },
      { id: 2, routine: '헬스장 가기1', tag:'건강' },
      { id: 3, routine: '명상하기1', tag:'일상' },
      { id: 4, routine: '게임1', tag:'없음' },
      { id: 4, routine: '게임1', tag:'없음' },
      { id: 4, routine: '게임1', tag:'없음' },
    ],
    '2021-05-w2':[
      { id: 1, routine: '코딩 테스트 문제 풀기', tag:'자기개발' },
      { id: 2, routine: '헬스장 가기', tag:'건강' },
      { id: 3, routine: '명상하기', tag:'일상' },
      { id: 3, routine: '명상하기', tag:'일상' },
      { id: 3, routine: '명상하기', tag:'일상' },
      { id: 3, routine: '명상하기', tag:'일상' },
      { id: 3, routine: '명상하기', tag:'일상' },
    ],
    '2021-05-w3':[
      { id: 1, routine: '코딩 테스트 문제 풀기3', tag:'자기개발' },
      { id: 2, routine: '헬스장 가기3', tag:'건강' },
      { id: 3, routine: '명상하기3', tag:'일상' },
      { id: 4, routine: '게임3', tag:'없음' },
    ],
    '2021-05-w4':[
      { id: 1, routine: '코딩 테스트 문제 풀기3', tag:'자기개발' },
      { id: 2, routine: '헬스장 가기3', tag:'건강' },
      { id: 3, routine: '명상하기3', tag:'일상' },
      { id: 4, routine: '게임3', tag:'없음' },
    ]
  }
  let renderData = {}
  contents[heatmap.weekDate].forEach((content)=>{
    if(renderData[content.id]){
      renderData[content.id]['cnt']++;
    }else{
      renderData[content.id] ={...content,cnt:1}
    }
  })
  
  const idx = Object.keys(contents).indexOf(heatmap.weekDate)

  return (
    <>
      <ScrollView style={{maxHeight:230}}>
        {
          renderData.length===0 && <Text>실패한 루틴이 하나도 없는 날이에요 👍</Text>
        }
        {renderData.length!==0 && Object.values(renderData)
        .map((item,key) => (
          <FailView key={key}>
            <TagText name={item.tag}>#{item.tag}</TagText>
            <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Text>
                {item.routine}
              </Text>
              <Text>
                {item.cnt}개
              </Text>
            </View>
          </FailView>
        ))}
      </ScrollView>
    </>
  );
}

export default Fail;
