import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Wrapper,
  TodoWrapper,
  Card,
  Contents,
  QRCodeButton,
  UserImage,
  UserStatus,
} from './home.styles';

import { CheckBox } from 'react-native-elements';

// 컴포넌트
import QRCodeAnim from '@/components/animations/QRCodeAnim';
import CarrotAnim from '@/components/animations/CarrotAnim';
import NavigationButton from '@/components/common/NavigationButton';

// 리덕스
import ModalContainer from '@/containers/ModalContainer';

// 디바이스 사이즈
import { deviceWidth, deviceHeight } from '@/utils/devicesize';

function HomeScreen({ navigation }) {
  const [active, setActive] = useState(false);
  const [qrOpen, setQROpen] = useState(false);

  const [todos, setTodos] = useState({
    1: { id: 1, content: '코딩 테스트 문제 풀기', checked: false },
    2: { id: 2, content: 'javascript 공부하기', checked: false },
    3: { id: 3, content: '책 읽기', checked: false },
  });

  let dailyQ = [
    { id: 1, content: '코딩 테스트 문제 풀기', checked: false },
    { id: 2, content: 'javascript 공부하기', checked: false },
    { id: 3, content: '책 읽기', checked: false },
  ];
  let emergencyQ = [
    { id: 1, content: '부모님에게 안부전화하기' },
    { id: 2, content: '30분 산책하며 머리 식히기' },
    { id: 3, content: '물 1L 마시기' },
  ];

  return (
    <Wrapper>
      <ScrollView>
        {/* section 1 - 프로필 */}
        <Contents>
          <View>
            <Text style={styles.title}>유저 이름</Text>
            <Card style={[styles.profile, styles.cardWidth]}>
              <UserImage>
                <CarrotAnim style={{ position: 'relative' }} />
              </UserImage>
              <UserStatus>
                <Text>HP: 50</Text>
                <Text>MP: 50</Text>
                <Text>EXP: 50</Text>
              </UserStatus>
            </Card>
          </View>
        </Contents>

        {/* section 2 - 일일 퀘스트 */}
        <Contents>
          {/* 모달 */}
          <ModalContainer active={active} />

          <View>
            <Text style={styles.title}>일일 퀘스트</Text>
            <Card style={styles.cardWidth}>
              {dailyQ.map((value) => (
                <TodoWrapper key={value.id}>
                  <TouchableOpacity onPress={() => {}}>
                    <Text>{value.content}</Text>
                  </TouchableOpacity>
                  <CheckBox
                    checkedIcon={
                      <Image
                        style={{ width: 16, height: 16 }}
                        source={require('@/assets/images/check-box.png')}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        style={{ width: 16, height: 16 }}
                        source={require('@/assets/images/blank-check-box.png')}
                      />
                    }
                    checked={value.checked}
                    onPress={() => {
                      !value.checked;
                    }}
                  />
                </TodoWrapper>
              ))}
            </Card>
          </View>
        </Contents>

        {/* section 3 - 긴급 퀘스트 */}
        <Contents>
          <View>
            <Text style={styles.title}>오늘의 긴급퀘스트</Text>
            <Card style={styles.cardWidth}>
              {emergencyQ.map((value) => (
                <TodoWrapper key={value.id}>
                  <Text>{value.content}</Text>
                </TodoWrapper>
              ))}
            </Card>
          </View>
        </Contents>
      </ScrollView>
      <QRCodeButton
        style={styles.android}
        onPress={() => {
          navigation.navigate('QR');
          setQROpen(!qrOpen);
        }}>
        <QRCodeAnim active={qrOpen} />
      </QRCodeButton>
      <NavigationButton navigation={navigation} />
    </Wrapper>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    marginBottom: 8,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardWidth: {
    width: deviceWidth - 20,
  },
  android: {
    elevation: 12,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default HomeScreen;
