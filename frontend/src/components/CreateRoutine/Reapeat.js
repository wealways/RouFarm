import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Text, View, Switch, Pressable } from 'react-native';
import styled from 'styled-components/native';

const ButtonWrapper = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  background: ${(props) => (props.checked ? '#D1DEFC' : '#fff')};
  padding: 8px;
  margin: 8px;
  border: 3px solid ${({ theme }) => theme.colors.third};
  border-radius: 8px;
`;

function Reapeat() {
  const [switchToggle, setSwitchToggle] = useState(false);

  const [yoil, setYoil] = useState([
    { id: 1, day: '월', checked: false },
    { id: 2, day: '화', checked: false },
    { id: 3, day: '수', checked: false },
    { id: 4, day: '목', checked: false },
    { id: 5, day: '금', checked: false },
    { id: 6, day: '토', checked: false },
    { id: 7, day: '일', checked: false },
  ]);

  const onToggle = useCallback((id) => {
    setYoil(yoil.map((value) => (value.id === id ? { ...value, checked: !value.checked } : value)));
  });

  return (
    <View>
      <ButtonWrapper>
        {yoil.map((value) => (
          <React.Fragment key={value.id}>
            <Button
              onPress={() => {
                onToggle(value.id);
              }}
              checked={value.checked}>
              <Text>{value.day}</Text>
            </Button>
          </React.Fragment>
        ))}
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonWrapper>
          <Text>매일 </Text>
          <Switch
            onChange={() => {
              setSwitchToggle(!switchToggle);
            }}
            value={switchToggle}
          />
        </ButtonWrapper>
        <Pressable
          hitSlop={{ bottom: 20, top: 20, left: 50, right: 10 }}
          onPress={() => console.log('123!')}>
          <Text>확인</Text>
        </Pressable>
      </ButtonWrapper>
    </View>
  );
}

export default Reapeat;
