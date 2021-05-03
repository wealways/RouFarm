import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Wrapper, Card, Contents, QRCodeButton, UserImage, UserStatus } from './home.styles';

// 컴포넌트
import { QRCodeAnim, CarrotAnim } from '@/components/animations';
import { NavigationButton } from '@/components/common';
import { DailyQuest, EmergencyQuest } from '@/components/Home';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';

// 디바이스 사이즈
import { deviceWidth } from '@/utils/devicesize';

// 페이지 리로드관련 hook
import { useIsFocused } from '@react-navigation/native';
import theme from '../../theme';

function HomeScreen({ navigation }) {
  const [quest, setQuest] = useState([]);
  const [qrOpen, setQROpen] = useState(false);
  const [up, setUp] = useState(0);

  // 네비게이션 리로드 테스트
  const isFocused = useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem('quest', (err, res) => {
      // console.log(res);
      setQuest(res);
      if (err) console.log(err);
    });
    // 이 페이지에 돌아올 때, 리로드할 로직을 넣기
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
                  style={styles.increaseButton}
                  onPress={() => {
                    setUp(up + 1);
                  }}>
                  <Text style={{ color: '#fff' }}>리로드테스트</Text>
                </TouchableOpacity>
              </UserStatus>
            </Card>
          </View>
        </Contents>

        {/* section 2 - 일일 퀘스트 */}
        <Contents>
          <View>
            <Text style={styles.title}>일일 퀘스트</Text>
            <Card style={styles.cardWidth}>
              <DailyQuest />
            </Card>
          </View>
        </Contents>

        {/* section 3 - 긴급 퀘스트 */}
        <Contents>
          <View>
            <Text style={styles.title}>오늘의 긴급퀘스트</Text>
            <Card style={styles.cardWidth}>
              <EmergencyQuest />
            </Card>
          </View>
        </Contents>
      </ScrollView>

      {/* <MyTabs /> */}

      <QRCodeButton
        style={styles.android}
        onPress={() => {
          navigation.navigate('QR');
          setQROpen(!qrOpen);
        }}>
        <QRCodeAnim active={qrOpen} />
      </QRCodeButton>

      {/* 네비게이션 버튼 */}
      <NavigationButton navigation={navigation} />
    </Wrapper>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#2e2e2e',
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

  increaseButton: {
    width: 150,
    height: 50,
    backgroundColor: theme.colors.first,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
