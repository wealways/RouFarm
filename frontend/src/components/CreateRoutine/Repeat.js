import React, { useCallback, useState } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ButtonWrapper = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  background: ${(props) => (props.checked ? '#2C5061' : '#FFFAED')};
  padding: 8px;
  margin: 8px;
  border: 1px solid ${({ theme }) => theme.colors.first};
  border-radius: 4px;
`;
const ConfigButton = styled.TouchableOpacity`
  background: ${(props) => (props.confirm ? '#2C5061' : '#FFFAED')};
  padding: 8px 16px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: ${(props) =>
    props.idx === 0 ? '#B8210D' : props.idx === 6 ? '#1F02B8' : props.checked ? '#fff' : '#000'};
  font-size: 16px;
`;

function Repeat({ setRepeatYoilList, setShowModal }) {
  const [switchToggle, setSwitchToggle] = useState(false);

  const [yoil, setYoil] = useState([
    { id: 0, day: '일', checked: false },
    { id: 1, day: '월', checked: false },
    { id: 2, day: '화', checked: false },
    { id: 3, day: '수', checked: false },
    { id: 4, day: '목', checked: false },
    { id: 5, day: '금', checked: false },
    { id: 6, day: '토', checked: false },
  ]);

  // 개별 toggle
  const onToggle = useCallback((id) => {
    setYoil(yoil.map((value) => (value.id === id ? { ...value, checked: !value.checked } : value)));
  });

  // 전체 toggle
  /**
   * 1. 전체 토글을 On하면 switchToggle의 값이 true로 변함
   * 2. 동시에 onSwitchToggle가 동작하여 모든 스위치 On
   */
  const onSwitchToggle = () => {
    switchToggle
      ? yoil.map((value) => (value.checked = false))
      : yoil.map((value) => (value.checked = true));
  };

  return (
    <View>
      <ButtonWrapper>
        {yoil.map((value, idx) => (
          <React.Fragment key={value.id}>
            <Button
              onPress={() => {
                onToggle(value.id);
              }}
              checked={value.checked}>
              <ButtonText checked={value.checked} idx={idx}>
                {value.day}
              </ButtonText>
            </Button>
          </React.Fragment>
        ))}
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonWrapper>
          <Switch
            color="orange"
            onChange={() => {
              setSwitchToggle(!switchToggle);
              onSwitchToggle();
            }}
            value={switchToggle}
          />
          <Text style={{ fontSize: 12 }}>매일 반복</Text>
        </ButtonWrapper>
        <View style={{ flexDirection: 'row' }}>
          <ConfigButton
            onPress={() => {
              setShowModal(false);
            }}>
            <Text>취소</Text>
          </ConfigButton>
          <ConfigButton
            confirm={true}
            onPress={() => {
              setShowModal(false);
              setRepeatYoilList(
                yoil.filter((value) => value.checked).map((value) => value && value.day),
              );
            }}>
            <Text style={styles.confirm}>확인</Text>
          </ConfigButton>
        </View>
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  confirm: {
    color: '#f2f3f6',
  },
});

export default Repeat;
