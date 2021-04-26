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
  border: 3px solid #aa8833;
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
  border: 3px solid #aa8833;
  background: ${({ theme }) => theme.colors.first};
  z-index: ${(props) => (props.open ? 1 : -1)};
`;

function NavigationButton({ navigation }) {
  const paths = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Report' },
    { id: 3, name: 'CreateRoutine' },
    { id: 4, name: 'Settings' },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonWrapper
        style={styles.android}
        onPress={() => {
          setOpen(!open);
        }}>
        <Text>Button</Text>
      </ButtonWrapper>
      {paths.map((value) => (
        <React.Fragment key={value.id}>
          <HideButton
            style={styles.android}
            onPress={() => {
              navigation.navigate(value.name);
            }}
            order={value.id}
            open={open}>
            <Text>{value.name}</Text>
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
});

export default NavigationButton;
