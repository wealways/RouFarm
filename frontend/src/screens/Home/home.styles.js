import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.second};
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
  background: ${({ theme }) => theme.colors.first};
`;

const UserImage = styled.View`
  flex: 2;
  background: ${({ theme }) => theme.colors.navy};
  border: 3px solid ${({ theme }) => theme.colors.purpleOne};
  border-radius: 8px;
`;

const UserStatus = styled.View`
  flex: 3;
  padding: 16px;
  justify-content: center;
`;

const QRCodeButton = styled.TouchableOpacity`
  margin: 8px;
  position: absolute;
  bottom: 0;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.first};
  border-radius: 8px;
`;

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

export { Wrapper, Card, Contents, QRCodeButton, ButtonWrapper, HideButton, UserImage, UserStatus };
