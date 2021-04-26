import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.second};
`;

const TodoWrapper = styled.View`
  flex: 4;
  margin: 8px;
  padding: 0 16px;
  width: 100%;
  height: 60px;
  background: #f2f3f6;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
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
  border: 3px solid #aa8833;
  border-radius: 8px;
`;

export { Wrapper, TodoWrapper, Card, Contents, QRCodeButton, UserImage, UserStatus };
