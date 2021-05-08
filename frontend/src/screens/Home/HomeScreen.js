import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Wrapper, Card, Contents, QRCodeButton, UserImage, UserStatus } from './home.styles';

// 컴포넌트
import { QRCodeAnim, CarrotAnim } from '@/components/animations';
import { NavigationButton } from '@/components/common';
import { DailyQuest, EmergencyQuest } from '@/components/Home';
import { ModalComponent } from '@/components/common';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';

// 디바이스 사이즈
import { deviceWidth } from '@/utils/devicesize';

// 페이지 리로드관련 hook
import { useIsFocused } from '@react-navigation/native';
import theme from '../../theme';

// 알람
import {
  setAlarm,
  setNofication,
  viewAlarms,
  deleteAlarm,
  stopAlarmSound,
} from '@/components/CreateRoutine/AlarmNotifi';

function HomeScreen({ navigation, route }) {
  // 모달
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [quest, setQuest] = useState({});
  const [qrOpen, setQROpen] = useState(false);
  const [up, setUp] = useState(0);

  const getAsyncStorage = (storageName, setData) => {
    AsyncStorage.getItem(storageName, (err, res) => {
      let data = JSON.parse(res);
      setData(data);
      console.log(data);
      if (err) console.log(err);
    });
  };

  // 네비게이션 리로드 테스트
  const isFocused = useIsFocused();
  route.params ? console.log(route.params) : null;

  useEffect(() => {
    getAsyncStorage('quest', setQuest);
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
              {Object.keys(quest).map((value) => (
                <React.Fragment key={value}>
                  <View>
                    <TouchableOpacity onPress={openModal}>
                      <Text>{quest[value].date}</Text>
                      <Text>{quest[value].questName}</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              ))}
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

      {/* 모달 */}
      <ModalComponent showModal={showModal} setShowModal={setShowModal}>
        <TouchableOpacity>
          <Text>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(uuid) => {
            console.log(quest[uuid], uuid);
            quest[uuid].alarmIdList.filter((v) => deleteAlarm(v));
            quest[uuid].notifiIdList.filter((v) => deleteAlarm(v));
            delete quest[uuid];
            AsyncStorage.setItem('quest', JSON.stringify(quest), () => {
              console.log('정보 삭제 완료');
            });
          }}>
          <Text>삭제</Text>
        </TouchableOpacity>
      </ModalComponent>

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
