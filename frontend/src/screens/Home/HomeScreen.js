import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Image,
  Pressable,
  RefreshControl,
} from 'react-native';
import {
  Wrapper,
  Card,
  Contents,
  EditDeleteCompleteButton,
  RoutineCreateButton,
} from './home.styles';
import { JwtConsumer } from '@/contexts/jwt';

// 컴포넌트
import { GetRoutine } from '@/components/Home';
import { getDailyQuests } from '@/components/Home/GetRoutine';
import { stopAlarmSound } from '@/components/CreateRoutine/AlarmNotifi';
import AlarmSvg from '@/assets/images/alarm.svg';
import StartSvg from '@/assets/images/flag.svg';
import MenuSvg from '@/assets/images/menu.svg';
import PenSvg from '@/assets/images/pen.svg';
import QrCodeSvg from '@/assets/images/qr-code.svg';
import FarmerAnim from '../../components/animations/FarmerAnim';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import { instance } from '@/api';
import theme from '../../theme';
import { yoilReverse } from '../../utils/parsedate';

// 라이브러리
import { Overlay } from 'react-native-elements';
import { showMessage, hideMessage } from 'react-native-flash-message';

// 디바이스 사이즈
import { deviceWidth, deviceHeight } from '@/utils/devicesize';

// 페이지 리로드관련 hook
import { useIsFocused } from '@react-navigation/native';

// 알람
import { deleteAlarm, makeAlarm } from '@/components/CreateRoutine/AlarmNotifi';
import { format } from 'prettier';

function HomeScreen({ navigation }) {
  const myRef = React.useRef();
  // 리프레쉬 컨트롤
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

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
    console.log(quests);
  }, [isFocused]);

  const handleComplete = async (jwt) => {
    let uuid = clickedUuid;
    let quest = quests[uuid];

    // 존재하는 루틴 인지 확인
    if (quest !== null) {
      // qr 알람이 아니면
      if (quest.qrOnceAlarmIdList.length + quest.qrRepeatAlarmIdList.length === 0) {
        // 시작된 루틴 인지 확인
        let [date, month, year] = [...quest.startDate.split('-')];
        if (new Date(year, month * 1 - 1, date * 1) <= new Date()) {
          let isQuit = false;

          // 일회성
          if (quest.repeatYoilList.length === 0) {
            // 오늘 알림이 맞으면
            if (new Date(year, month * 1 - 1, date * 1).getDay() === new Date().getDay()) {
              // 알람이 존재하는지 확인
              isQuit = true;
              if (quest.alarmIdList.length !== 0) {
                await deleteAlarm(quest.alarmIdList[0]);
                quest.alarmIdList = [];
              }
              // 삭제
              delete quests[uuid];
              instance
                .delete(`routine/${uuid}`, {
                  headers: {
                    Authorization: jwt,
                  },
                })
                .then((res) => console.log('delete response', res.data))
                .catch((err) => console.log(err));

              showMessage({
                message: '루틴을 성공했어요 ! 🎉',
                type: 'success',
              });
            }
          } else {
            // 반복성
            let i = -1;

            quest.repeatYoilList.map((val, idx) => {
              // 같은 요일 인지 확인
              if (yoilReverse[val] === new Date().getDay()) {
                isQuit = true;
                i = idx;
              }
            });

            // 오늘 루틴이 맞으면
            if (i !== -1) {
              // 루틴 완료!
              // 추가 알람 시간 계산
              let alarmDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 7,
              );
              alarmDate =
                alarmDate.getDate() +
                '-' +
                (alarmDate.getMonth() * 1 + 1) +
                '-' +
                alarmDate.getFullYear();

              // quest.startDate 계산
              quest.repeatDateList[i] = alarmDate;

              let tempRepeatDateList = [].concat(quest.repeatDateList);
              tempRepeatDateList &&
                tempRepeatDateList.sort((a, b) => {
                  const [dayA, monthA, yearA] = a.split('-');
                  const [dayB, monthB, yearB] = b.split('-');
                  return new Date(yearA, monthA, dayA) < new Date(yearB, monthB, dayB) ? -1 : 1;
                });
              quest.startDate = tempRepeatDateList[0];

              // 알람 다음주로 변경!
              // 알람이 존재하는지 확인
              if (quest.alarmIdList.length !== 0) {
                // 기존 알람 삭제
                await deleteAlarm(quest.alarmIdList[i]);
                // 향후 알람 추가
                const alarmId = await makeAlarm(
                  alarmDate,
                  [quest.repeatYoilList[i]],
                  quest.questName,
                  quest.alarmTime,
                );
                console.log(alarmId);
                quest.alarmIdList[i] = alarmId[0];
              }

              // quests 수정
              quests[uuid] = quest;

              showMessage({
                message: '루틴을 성공했어요 ! 🎉',
                type: 'success',
              });
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
            await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
              console.log('정보 저장 완료');
              navigation.navigate('Home');
            });

            // 루틴 로그 기록
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
          }
        }
      } else {
        // qr 알람이면
        Alert.alert('QR알람은 QR태그로만 완료할 수 있어요 !');
        navigation.navigate('QR');
      }
    }
  };

  return (
    <Wrapper>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Overlay isVisible={showModal} />

        {new Date().getHours() >= 6 && new Date().getHours() < 18 ? (
          <View>
            <Image
              style={styles.backgroundImageWrapper}
              source={require('../../assets/images/morning.jpg')}></Image>
            <FarmerAnim
              style={{
                position: 'absolute',
                alignItems: 'center',
                left: -27,
                bottom: -23,
                width: 510,
              }}
            />
          </View>
        ) : new Date().getHours() >= 18 && new Date().getHours() < 20 ? (
          <Image
            style={styles.backgroundImageWrapper}
            source={require('../../assets/images/morning.jpg')}></Image>
        ) : (
          <Image
            style={styles.backgroundImageWrapper}
            source={require('../../assets/images/night.jpg')}></Image>
        )}
        {/* section 1 - 일일 퀘스트 */}
        <Contents style={(styles.android, { paddingBottom: 40 })}>
          <View>
            {quests !== null ? (
              <GetRoutine quests={quests} setClickedQuestUuidList={setClickedQuestUuidList} />
            ) : null}
            <Text style={styles.title}>루틴 목록</Text>
            {clickedQuestUuidList.length > 0 ? (
              <>
                {clickedQuestUuidList.map((uuid) => (
                  <React.Fragment key={uuid}>
                    {quests[uuid] ? (
                      <Card style={styles.cardWrapper}>
                        <>
                          <View>
                            {/* 루틴제목(+ QR유무) */}
                            {quests[uuid].qrOnceAlarmIdList.length +
                              quests[uuid].qrRepeatAlarmIdList.length >
                              0 ? (
                              <View style={styles.cardTitleWrapper}>
                                <QrCodeSvg width={20} height={20} marginRight={8} fill={'#fff'} />
                                <Text style={styles.cardTitle}>{quests[uuid].questName}</Text>
                              </View>
                            ) : (
                              <Text style={styles.cardTitle}>{quests[uuid].questName}</Text>
                            )}

                            {/* 시작/끝 시간 */}
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 4,
                              }}>
                              <StartSvg
                                width={10}
                                height={10}
                                fill={'#fff'}
                                style={{ marginRight: 8 }}
                              />
                              <Text style={styles.cardTime}>
                                {quests[uuid].startTime.split(':')[0] > 12
                                  ? `PM ${quests[uuid].startTime.split(':')[0] - 12}시 ${quests[uuid].startTime.split(':')[1]
                                  }분 ~ `
                                  : `AM ${quests[uuid].startTime.split(':')[0]}시 ${quests[uuid].startTime.split(':')[1]
                                  }분 ~ `}
                              </Text>
                              {quests[uuid].endTime !== '' && (
                                <>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.cardTime}>
                                      {quests[uuid].endTime.split(':')[0] > 12
                                        ? `PM ${quests[uuid].endTime.split(':')[0] - 12}: ${quests[uuid].endTime.split(':')[1]
                                        }`
                                        : `AM ${quests[uuid].endTime.split(':')[0]}:${quests[uuid].endTime.split(':')[1]
                                        }`}
                                    </Text>
                                  </View>
                                </>
                              )}
                            </View>

                            {/* 알람 */}
                            {quests[uuid].alarmTime !== '' && (
                              <>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <View>
                                    <AlarmSvg
                                      width={10}
                                      height={10}
                                      fill={'#fff'}
                                      style={{ marginRight: 8 }}
                                    />
                                  </View>
                                  <Text style={styles.cardTime}>
                                    {quests[uuid].alarmTime.split(':')[0] > 12
                                      ? `PM ${quests[uuid].alarmTime.split(':')[0] - 12}시 ${quests[uuid].alarmTime.split(':')[1]
                                      }분`
                                      : `AM ${quests[uuid].alarmTime.split(':')[0]}시 ${quests[uuid].alarmTime.split(':')[1]
                                      }분`}
                                  </Text>
                                </View>
                              </>
                            )}
                          </View>
                        </>
                        <>
                          <Pressable
                            hitSlop={40}
                            onPress={() => {
                              setClickedUuid(uuid);
                              toggleModal();
                            }}>
                            {({ pressed }) => (
                              <MenuSvg
                                width={20}
                                height={20}
                                fill={pressed ? 'rgba(255,255,255,0.3)' : '#fff'}
                              />
                            )}
                          </Pressable>
                        </>
                      </Card>
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
                              <Text style={styles.modalTitle}>어떤 작업을 하시겠어요? 🤔</Text>
                              <EditDeleteCompleteButton
                                type="edit"
                                onPress={() => {
                                  navigation.navigate('UpdateRoutine', {
                                    uuid: clickedUuid,
                                    quest: quests[clickedUuid],
                                  });
                                  toggleModal();
                                }}>
                                <Text style={styles.modalText}>수정</Text>
                              </EditDeleteCompleteButton>
                              <JwtConsumer>
                                {({ JWT }) => (
                                  <>
                                    <EditDeleteCompleteButton
                                      type="delete"
                                      onPress={() => {
                                        quests[clickedUuid].alarmIdList.map((v) => deleteAlarm(v));
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
                                      <Text style={styles.modalText}>삭제</Text>
                                    </EditDeleteCompleteButton>
                                    <EditDeleteCompleteButton
                                      type="complete"
                                      onPress={() => {
                                        console.log(JWT.jwt);
                                        handleComplete(JWT.jwt);

                                        toggleModal();
                                      }}>
                                      <Text style={styles.modalText}>완료</Text>
                                    </EditDeleteCompleteButton>
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
              <Card style={styles.cardWrapper}>
                <Text style={{ color: '#fff' }}>루틴을 생성해주세요.📝</Text>
              </Card>
            )}
          </View>
        </Contents>
      </ScrollView>
      <RoutineCreateButton
        style={styles.android}
        onPress={() => {
          navigation.navigate('CreateRoutine');
        }}>
        <PenSvg width={32} height={32} fill={'#fff'} />
      </RoutineCreateButton>
    </Wrapper>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImageWrapper: {
    width: '100%',
    height: deviceHeight / 2.7,
    margin: 0,
    padding: 0,
    backgroundColor: '#A78870',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: theme.colors.third,
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
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    color: '#f2f3f6',
    fontWeight: 'bold',
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
  cardWrapper: {
    width: deviceWidth - 20,
    elevation: 12,
  },
  cardTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#f2f3f6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#f2f3f6',
    fontSize: 10,
  },
  android: {
    elevation: 12,
  },
});
