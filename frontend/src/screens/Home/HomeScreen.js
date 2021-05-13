import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import { Wrapper, Card, Contents, QRCodeButton, UserImage, UserStatus } from './home.styles';

// 컴포넌트
import { QRCodeAnim, CarrotAnim } from '@/components/animations';
import { NavigationButton } from '@/components/common';
import { EmergencyQuest } from '@/components/Home';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import { yoilReverse } from '@/utils/parsedate';

// 디바이스 사이즈
import { deviceWidth } from '@/utils/devicesize';

// 페이지 리로드관련 hook
import { useIsFocused } from '@react-navigation/native';
import theme from '../../theme';

// 알람
import { deleteAlarm } from '@/components/CreateRoutine/AlarmNotifi';

function HomeScreen({ navigation }) {
  // 모달
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [quests, setQuests] = useState({});
  const [qrOpen, setQROpen] = useState(false);
  const [clickedUuid, setClickedUuid] = useState('');

  const getAsyncStorage = async (storageName, setData) => {
    await AsyncStorage.getItem(storageName, (err, res) => {
      let data = JSON.parse(res);
      setData(data === null ? {} : data); // null 에러 처리
      if (err) console.log(err);
      console.log(data);
    });
  };

  // 요일 버튼을 누르면 해당 요일에 퀘스트 uuid를 가져오기
  const getDailyQuests = (date) => {
    const [day1, month1, year1] = date.split('-');

    let uuidList = Object.keys(quests).filter((uuid) => {
      if (!quests[uuid].repeatDate.length) {
        return date === quests[uuid].startDate;
      } else {
        const [day2, month2, year2] = quests[uuid].startDate.split('-');
        // 시작한 루틴인지 확인
        if (new Date(year2, month2 - 1, day2) <= new Date(year1, month1 - 1, day1)) {
          const yoil1 = new Date(year1, month1 - 1, day1).getDay();

          // 같은 요일 루틴인지 확인
          const result = quests[uuid].isReapeat.filter((yoil2) => {
            if (yoil1 === yoilReverse[yoil2]) {
              return true;
            }
            return false;
          });

          return result === null ? false : true;
        }

        return false;
      }
    });

    uuidList = uuidList === null ? [] : uuidList;
    return uuidList;
  };

  // 리로드 변수
  const isFocused = useIsFocused();

  useEffect(() => {
    getAsyncStorage('quests', setQuests);
    // setUp(0);
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
            </Card>
          </View>
        </Contents>
        {/* section 1 - 일일 퀘스트 */}
        <Contents>
          <View>
            <Text style={styles.title}>일일 퀘스트</Text>
            <Card style={styles.cardWidth}>
              {Object.keys(quests).map((uuid) => (
                <React.Fragment key={uuid}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setClickedUuid(uuid);
                        openModal();
                      }}>
                      <Text>{quests[uuid].questName}</Text>
                      <Text>{quests[uuid].startDate}</Text>
                      <>
                        {showModal ? (
                          <View>
                            <Modal
                              animationType="fade"
                              transparent={true}
                              visible={showModal}
                              onRequestClose={() => {
                                setShowModal(false);
                              }}>
                              <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      navigation.navigate('UpdateRoutine', {
                                        uuid: clickedUuid,
                                        quest: quests[clickedUuid],
                                      });
                                    }}>
                                    <Text>수정</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      quests[clickedUuid].alarmIdList.map((v) => deleteAlarm(v));
                                      quests[clickedUuid].qrOnceAlarmIdList.map((v) =>
                                        deleteAlarm(v),
                                      );
                                      quests[clickedUuid].qrRepeatAlarmIdList.map((v) =>
                                        deleteAlarm(v),
                                      );
                                      delete quests[clickedUuid];
                                      AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
                                        console.log('정보 삭제 완료');
                                      });
                                    }}>
                                    <Text>삭제</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </Modal>
                          </View>
                        ) : null}
                      </>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
