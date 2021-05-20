import styled from 'styled-components/native';
import theme from '../../theme';

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
  padding: 0 16px;
`;

const Card = styled.View`
  width: 100%;
  margin: 8px 0;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.first};
`;

const UserImage = styled.View`
  flex: 2;
  background: ${({ theme }) => theme.colors.first};
  border-radius: 8px;
`;

const UserStatus = styled.View`
  flex: 3;
  padding: 16px;
  justify-content: center;
`;

const RoutineCreateButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.colors.first};
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 2px solid rgba(255, 125, 125, 0.7);
`;

const EditDeleteCompleteButton = styled.TouchableOpacity`
  width: 160px;
  height: 40px;
  margin: 8px 0;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.type === 'edit' ? theme.colors.first : props.type === 'delete' ? '#F26811' : '#1A4D2A'};
  border-radius: 8px;
`;

export {
  Wrapper,
  Card,
  Contents,
  UserImage,
  UserStatus,
  EditDeleteCompleteButton,
  RoutineCreateButton,
};
