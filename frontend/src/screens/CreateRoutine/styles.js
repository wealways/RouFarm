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

const ButtonWrapper = styled.TouchableOpacity`
  margin: 16px auto;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.navy};
`;

export { Wrapper, ButtonWrapper, Card, Contents };
