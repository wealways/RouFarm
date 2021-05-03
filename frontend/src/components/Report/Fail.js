import React, { useState,useEffect } from 'react';
import { 
  Text, 
  View,

} from 'react-native';

import styled from 'styled-components/native';

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
  background-color:${({name}) => name==="건강" ? "#6f95aa" : name==="자기개발" ? "#0c985e" : name==="일상" ? "#dce8ef" : "687396"};
  color:${({name}) => name!="일상"?"white":"#000"};
`

const Fail = (contents) => {
  return (
    <View>
      {Object.values(contents)
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
      }
    </View>
  );
}

export default Fail;
