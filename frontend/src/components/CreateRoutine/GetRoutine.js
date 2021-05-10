import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../theme';

const DateButton = styled.TouchableOpacity`
  padding: 8px;
  margin: 0 4px;
  background: #382f9b;
  border-radius: 8px;
`;

function GetRoutine() {
  // props로 해당 날짜를 입력 받고,
  // 해당날짜 +-3일을 버튼으로 만들어주고,

  // 자기 자신한테, 날짜를 입력 받아야한다..
  // 어떻게 보면 pagenation이다..
  const [reachedEnd, setReachedEnd] = useState(false);
  const a = new Array(100).fill('21.05.10(월)');
  return (
    <ScrollView horizontal={true}>
      {a.map((v, i) => (
        <React.Fragment key={i}>
          <DateButton>
            <Text style={{ color: '#fff' }} key={i}>
              {v}
            </Text>
          </DateButton>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

export default GetRoutine;
