import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import { Wrapper, Card, Contents, QRCodeButton, UserImage } from './home.styles';

// 컴포넌트
import { QRCodeAnim, CarrotAnim } from '@/components/animations';
import { NavigationButton } from '@/components/common';
import { EmergencyQuest, GetRoutine } from '@/components/Home';
import { getDailyQuests } from '@/components/Home/GetRoutine';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import theme from '../../theme';
import { Overlay } from 'react-native-elements';

// 디바이스 사이즈
import { deviceWidth } from '@/utils/devicesize';

// 페이지 리로드관련 hook
import { useIsFocused } from '@react-navigation/native';

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
                              openModal();
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

                                    // 삭제 요청
                                    const instance = axios.create({
                                      baseURL: 'http://k4c105.p.ssafy.io/api/',
                                      headers: {
                                        Authorization:
                                          'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjM0NTY3ODkiLCJpYXQiOjE2MjA5NTgwODEsImV4cCI6MTYyMzU1MDA4MX0.ShjZ5egr9AmY2calidv_jf77DqfRqt3lR05UQLZn8rOVgQuD9wXxCQcw0QKPFm8cRWwCMzoPvW-OqonAZbkHFQ',
                                      },
                                    });
                                    instance
                                      .delete(`routine/${clickedUuid}`)
                                      .then((res) => console.log('delete response', res.data))
                                      .catch((err) => console.log(err));
                                  }}>
                                  <Text>삭제</Text>
                                </TouchableOpacity>
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
