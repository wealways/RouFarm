import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, StyleSheet } from 'react-native';

const ButtonWrapper = styled.TouchableOpacity`
  margin: 8px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 64px;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
`;

const HideButton = styled.TouchableOpacity`
  margin: 8px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: ${(props) => (props.open ? props.order * 56 + 'px' : 0)};
  width: 64px;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
  z-index: ${(props) => (props.open ? 1 : -1)};
`;

function NavigationButton({ navigation }) {
  const paths = [
    { id: 1, path: 'Home', name: '홈' },
    { id: 2, path: 'Report', name: '리포트' },
    { id: 3, path: 'CreateRoutine', name: '퀘스트 생성' },
    { id: 4, path: 'Settings', name: '환경설정' },
    // 스크린 테스트용 - 나중에 변경
    { id: 5, path: 'Login', name: '로그인' },
    { id: 6, path: 'SelectMode', name: '모드선택' },
    { id: 7, path: 'FriendList', name: '친구목록' },
    { id: 8, path: 'AlarmTest', name: '알람 테스트' },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonWrapper
        style={styles.android}
        onPress={() => {
          setOpen(!open);
        }}>
        <Text style={styles.buttonText}>+</Text>
      </ButtonWrapper>
      {paths.map((value) => (
        <React.Fragment key={value.id}>
          <HideButton
            style={styles.android}
            onPress={() => {
              navigation.navigate(value.path);
            }}
            order={value.id}
            open={open}>
            <Text style={styles.buttonText}>{value.name}</Text>
          </HideButton>
        </React.Fragment>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  android: {
    elevation: 8,
  },
  buttonText: {
    color: '#f2f3f6',
    textAlign: 'center',
    // color: '#2e2e2e',
  },
});

export default NavigationButton;
