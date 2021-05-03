import React, { useState,useEffect,useContext } from 'react';
import { 
  Text, 
  View,

} from 'react-native';

import styled from 'styled-components/native';
import FailListContext from '@/contexts/Report/FailList';

const FailView = styled.View`
  border-bottom-color:#000;
  border-bottom-width: 2px;
  border-radius: 5px;
  margin:8px;
  padding:8px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  width:300px;
`

const TagText = styled.Text`
  padding:9px;
  border-radius:10px;
  background-color:${({name}) => name==="건강" ? "#6f95aa" : name==="자기개발" ? "#0c985e" : name==="일상" ? "#dce8ef" : "#687396"};
  color:${({name}) => name!="일상"?"white":"#000"};
`

const Fail = () => {
  const {failList} = useContext(FailListContext);
  const contents = {
    '2021-05-01':[
      { id: 1, routine: '코딩 테스트 문제 풀기1', checked: false, tag:'자기개발' },
      { id: 2, routine: '헬스장 가기1', checked: false, tag:'건강' },
      { id: 3, routine: '명상하기1', checked: false, tag:'일상' },
      { id: 4, routine: '게임1', checked: false, tag:'없음' },
      { id: 5, routine: '게임1', checked: false, tag:'없음' },
    ],
    '2021-05-02':[
      { id: 1, routine: '코딩 테스트 문제 풀기', checked: false, tag:'자기개발' },
      { id: 2, routine: '헬스장 가기', checked: false, tag:'건강' },
      { id: 3, routine: '명상하기', checked: false, tag:'일상' },
    ],
    '2021-05-03':[
      { id: 1, routine: '코딩 테스트 문제 풀기3', checked: false, tag:'자기개발' },
      { id: 2, routine: '헬스장 가기3', checked: false, tag:'건강' },
      { id: 3, routine: '명상하기3', checked: false, tag:'일상' },
      { id: 4, routine: '게임3', checked: false, tag:'없음' },
    ]
  }
  console.log(failList.date)
  const idx = Object.keys(contents).indexOf(failList.date)
  console.log(idx)
  console.log(Object.values(contents)[idx])

  return (
    <View>
      {idx!=-1 && Object.values(contents)[idx]
      .map((item) => (
        <FailView key={item.id}>
          <Text>
            {item.routine}
          </Text>
          <TagText name={item.tag}>{item.tag}</TagText>
        </FailView>
      ))}
      {/* {Object.values(contents)
        .map((content) => (
          content.map((item) => (
            <FailView key={item.id}>
              <Text>
                {item.routine}
              </Text>
              <TagText name={item.tag}>{item.tag}</TagText>
            </FailView>
          ))
        ))
      } */}
    </View>
  );
}

export default Fail;
