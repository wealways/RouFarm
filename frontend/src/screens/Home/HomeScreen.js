import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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

// 홈화면으로 오면 refresh되도록!
import { useIsFocused } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const [active, setActive] = useState(false);
  const [qrOpen, setQROpen] = useState(false);
  const [up, setUp] = useState(0);

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

  // 네비게이션 리로드 테스트
  const isFocused = useIsFocused();

  useEffect(() => {
    // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
    setUp(0);
  }, [isFocused]);

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
                <Text style={[styles.title, { color: '#000' }]}>{up}</Text>
                {/* 네비게이션 리로드 테스트 */}
                <TouchableOpacity
                  style={styles.border}
                  onPress={() => {
                    setUp(up + 1);
                  }}>
                  <Text style={styles.title}>숫자증가</Text>
                </TouchableOpacity>
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
  border: {
    width: 100,
    height: 50,
    backgroundColor: '#5c7152',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
