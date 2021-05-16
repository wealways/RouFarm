import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Wrapper, Card, Contents, QRCodeButton, UserImage } from './home.styles';
import { JwtConsumer } from '@/contexts/jwt';

// 컴포넌트
import { QRCodeAnim, CarrotAnim } from '@/components/animations';
import { NavigationButton } from '@/components/common';
import { EmergencyQuest, GetRoutine } from '@/components/Home';
import { getDailyQuests } from '@/components/Home/GetRoutine';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { instance } from '@/api';
import theme from '../../theme';
import { Overlay } from 'react-native-elements';
import { yoilReverse } from '../../utils/parsedate';

// 디바이스 사이즈
import { deviceWidth } from '@/utils/devicesize';

// 페이지 리로드관련 hook
import { useIsFocused } from '@react-navigation/native';

// 알람
import { deleteAlarm, makeAlarm } from '@/components/CreateRoutine/AlarmNotifi';

function HomeScreen({ navigation }) {
  // 모달
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const [quests, setQuests] = useState({});
  const [qrOpen, setQROpen] = useState(false);
  const [clickedUuid, setClickedUuid] = useState('');

  const [clickedQuestUuidList, setClickedQuestUuidList] = useState([]);

  const getAsyncStorage = async (storageName, setData) => {
    await AsyncStorage.getItem(storageName, (err, res) => {
      let data = JSON.parse(res);
      data = data === null ? {} : data;
      setData(data); // null 에러 처리

      setClickedQuestUuidList(
        getDailyQuests(
          data,
          new Date().getDate() +
            '-' +
            (new Date().getMonth() * 1 + 1) +
            '-' +
            new Date().getFullYear(),
        ),
      );

      if (err) console.log(err);

      console.log(data);
    });
  };

  // 리로드 변수
  const isFocused = useIsFocused();

  useEffect(async () => {
    await getAsyncStorage('quests', setQuests);
  }, [isFocused]);

  const handleComplete = async (jwt) => {
    let uuid = clickedUuid;
    let quest = quests[uuid];

    // 존재하는 루틴 인지 확인
    if (quest !== null) {
      // 시작된 루틴 인지 확인
      let [date, month, year] = [...quest.startDate.split('-')];

      if (new Date(year, month * 1 - 1, date * 1) <= new Date()) {
        // 알람이 존재하는지 확인
        if (quest.alarmIdList.length !== 0) {
          let isQuit = false;

          // 알람이 울리기 전이면, 알람 삭제 및 생성
          if (quest.repeatYoilList.length === 0) {
            // 일회성
            // 기존 알림 삭제
            if (new Date(year, month * 1 - 1, date * 1).getDay() === new Date().getDay()) {
              if (quest.alarmIdList.length) {
                isQuit = true;
                await deleteAlarm(quest.alarmIdList[0]);
                quest.alarmIdList = [];
              }
            }
          } else {
            // 반복성
            let i = -1;

            quest.repeatYoilList.map((val, idx) => {
              // 같은 요일 인지 확인
              if (yoilReverse[val] === new Date().getDay()) {
                i = idx;
                isQuit = true;
              }
            });

            if (i !== -1) {
              // 기존 알람 삭제
              await deleteAlarm(quest.alarmIdList[i]);

              // 향후 알람 추가
              let startDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 7,
              );
              startDate =
                startDate.getDate() +
                '-' +
                (startDate.getMonth() * 1 + 1) +
                '-' +
                startDate.getFullYear();

              quest.repeatDateList[i] = startDate;

              const alarmId = await makeAlarm(
                startDate,
                [quest.repeatYoilList[i]],
                quest.questName,
                quest.alarmTime,
              );
              console.log(alarmId);
              quest.alarmIdList[i] = alarmId[0];
            }
          }

          // 진짜 알람들을 삭제 했냐? == 좀 원래꺼랑 바꿨냐?
          if (isQuit) {
            // 알람이 울린 후이면, 알람 종료
            let [hours, minutes, seconds] = [...quest.alarmTime.split(':')];
            if (new Date(year, month * 1 - 1, date * 1, hours, minutes, seconds) <= new Date()) {
              stopAlarmSound();
            }

            // 메모리에 저장
            quests[uuid] = quest;
            await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
              console.log('정보 저장 완료');
              navigation.navigate('Home');
            });
          }
        }
      }

      date = date.length == 1 ? '0' + date : date;
      month = month.length == 1 ? '0' + month : month;

      instance
        .post(
          'routineLog/',
          {
            routineId: uuid,
            time: date + '-' + month + '-' + year,
            isSuccess: 'true',
          },
          {
            headers: {
              Authorization: jwt,
            },
          },
        )
        .then((res) => console.log('post response!', res.data))
        .catch((err) => console.log(err));

      Alert.alert('루틴 성공 !');
    }
  };

  return (
    <Wrapper>
      <ScrollView>
        <Overlay isVisible={showModal} />

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

            {quests !== null ? (
              <GetRoutine quests={quests} setClickedQuestUuidList={setClickedQuestUuidList} />
            ) : null}

            <Card style={styles.cardWidth}>
              {clickedQuestUuidList.length > 0 ? (
                <>
                  {clickedQuestUuidList.map((uuid) => (
                    <React.Fragment key={uuid}>
                      {quests[uuid] ? (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setClickedUuid(uuid);
                              toggleModal();
                            }}>
                            <Text>{quests[uuid].questName}</Text>
                            <Text>{quests[uuid].startDate}</Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}

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
                                    toggleModal();
                                  }}>
                                  <Text>수정</Text>
                                </TouchableOpacity>
                                <JwtConsumer>
                                  {({ JWT }) => (
                                    <>
                                      <TouchableOpacity
                                        onPress={() => {
                                          quests[clickedUuid].alarmIdList.map((v) =>
                                            deleteAlarm(v),
                                          );
                                          quests[clickedUuid].qrOnceAlarmIdList.map((v) =>
                                            deleteAlarm(v),
                                          );
                                          quests[clickedUuid].qrRepeatAlarmIdList.map((v) =>
                                            deleteAlarm(v),
                                          );
                                          delete quests[clickedUuid];
                                          AsyncStorage.setItem(
                                            'quests',
                                            JSON.stringify(quests),
                                            () => {
                                              console.log('정보 삭제 완료');
                                            },
                                          );

                                          // 삭제 요청
                                          instance
                                            .delete(`routine/${clickedUuid}`, {
                                              headers: {
                                                Authorization: JWT.jwt,
                                              },
                                            })
                                            .then((res) => console.log('delete response', res.data))
                                            .catch((err) => console.log(err));

                                          toggleModal();
                                        }}>
                                        <Text>삭제</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        onPress={() => {
                                          console.log(JWT.jwt);
                                          handleComplete(JWT.jwt);
                                        }}>
                                        <Text>완료</Text>
                                      </TouchableOpacity>
                                    </>
                                  )}
                                </JwtConsumer>
                              </View>
                            </View>
                          </Modal>
                        </View>
                      ) : null}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <View>
                  <Text>루틴을 생성해주세요.📝🤞💑😏😆😡🤦‍♂️🗝👍😂</Text>
                </View>
              )}
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
export default HomeScreen;

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
