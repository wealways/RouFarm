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
              <Text style={{backgroundColor:'blue', color: "white", padding:8, borderRadius:10}}>
                {item.tag}
              </Text>
            </FailView>
          ))
        ))
      }
    </View>
  );
}

export default Fail;
