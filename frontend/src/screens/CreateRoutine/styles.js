import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.third};
`;

const Contents = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: 8px 0;
`;

const Card = styled.View`
  padding: 16px;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.second};
`;

const ButtonWrapper = styled.TouchableOpacity`
  margin: 16px auto;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
`;

const SettingWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 16px 0;
  padding: 0 16px;
`;

const SettingTitle = styled.Text`
  flex: 2;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
const SettingButton = styled.TouchableOpacity`
  flex: 4;
  flex-direction: row;
  height: 100%;
  min-height: 48px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

const SmallButton = styled.TouchableOpacity`
  width: 45%;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export {
  Wrapper,
  ButtonWrapper,
  Card,
  Contents,
  SettingWrapper,
  SettingTitle,
  SettingButton,
  SmallButton,
};
