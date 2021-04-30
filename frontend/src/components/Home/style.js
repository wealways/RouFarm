import styled from 'styled-components/native';

const TodoWrapper = styled.View`
  flex: 4;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 8px 0;
  padding: 16px;
  background: ${({ theme }) => theme.colors.third};
  border-radius: 8px;
`;

export { TodoWrapper };
