import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TextInput } from 'react-native';

import {
  Wrapper,
  ButtonWrapper,
  Card,
  Contents,
  SettingWrapper,
  SmallButton,
  SettingTitle,
  SettingButton,
} from './styles';
import { deviceWidth } from '@/utils/devicesize';

// 라이브러리
import { Switch } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// 컴포넌트
import ModalComponent from '@/components/common/ModalComponent';
import NavigationButton from '@/components/common/NavigationButton';
import Repreat from '@/components/CreateRoutine/Repeat';
import {
  deleteAlarm,
  makeQRAlarm,
  makeAlarm,
  makeRepeatDate,
} from '@/components/CreateRoutine/AlarmNotifi';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const today =
  new Date().getDate() +
  '-' +
  (new Date().getMonth() * 1 + 1).toString() +
  '-' +
  new Date().getFullYear();

function UpdateRoutineScreen({ navigation, route }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // 모달 상태
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTimeShow, setStartTimeShow] = useState(false);
  const [endTimeShow, setEndTimeShow] = useState(false);
  const [alarmTimeShow, setAlarmTimeShow] = useState(false);

  // 생성시 넘길 데이터
  const [questName, setQuestname] = useState(route.params.quest.questName);
  const [startDate, setStartDate] = useState(route.params.quest.startDate);
  const [startTime, setStartTime] = useState(route.params.quest.startTime);
  const [endTime, setEndTime] = useState(route.params.quest.endTime);
  const [alarmTime, setAlarmTime] = useState(route.params.quest.alarmTime);
  const [repeatYoilList, setRepeatYoilList] = useState(route.params.quest.repeatYoilList);

  // 스위치 상태
  const [isQR, setIsQR] = useState(
    route.params.quest.qrOnceAlarmIdList.length + route.params.quest.qrRepeatAlarmIdList.length !==
      0,
  );
  const [isAlarm, setIsAlarm] = useState(alarmTime !== '');

  // 퀘스트 생성
  const handleCreate = async () => {
    // 기존의 알람 제거
    await route.params.quest.alarmIdList.map((v) => deleteAlarm(v));
    await route.params.quest.qrOnceAlarmIdList.map((v) => deleteAlarm(v));
    await route.params.quest.qrRepeatAlarmIdList.map((v) => deleteAlarm(v));
    console.log('delete alarm!');

    // 퀘스트 uuid 생성
    let uuid = parseInt(Math.random() * Math.pow(10, 16));

    // 새로운 알람 생성
    let alarmIdList = [];
    let qrOnceAlarmIdList = [];
    let qrRepeatAlarmIdList = [];
    if (isAlarm) {
      if (isQR) {
        if (repeatYoilList.length === 0) {
          qrOnceAlarmIdList = await makeQRAlarm(startDate, repeatYoilList, questName, alarmTime);
        } else {
          qrRepeatAlarmIdList = await makeQRAlarm(startDate, repeatYoilList, questName, alarmTime);
        }
      } else {
        alarmIdList = await makeAlarm(startDate, repeatYoilList, questName, alarmTime);
      }
    }
    console.log('create alarm!');

    // 반복일 계산
    let repeatDateList = [];
    repeatYoilList.map((v) => {
      repeatDateList.push(makeRepeatDate(startDate, v, alarmTime));
    });

    // 반복일 오름차순 정렬
    let tempRepeatDateList = [].concat(repeatDateList);
    tempRepeatDateList &&
      tempRepeatDateList.sort((a, b) => {
        const [dayA, monthA, yearA] = a.split('-');
        const [dayB, monthB, yearB] = b.split('-');
        return new Date(yearA, monthA, dayA) < new Date(yearB, monthB, dayB) ? -1 : 1;
      });

    // 메모리에 저장
    AsyncStorage.getItem('quests', async (err, res) => {
      let quests = JSON.parse(res);
      if (quests === null) {
        quests = {};
      } else {
        delete quests[route.params.uuid];
      }

      quests[uuid] = {
        startDate: tempRepeatDateList.length ? tempRepeatDateList[0] : startDate,
        questName,
        alarmTime,
        startTime,
        endTime,
        repeatDateList, // 반복일자 리스크 (string, 일-월-년)
        repeatYoilList, // 반복요일 리스트 (string, 월 ~ 일)
        alarmIdList, // 알람id 리스트 (int 타입)
        qrOnceAlarmIdList, // 일회성 QR알람id 리스트 (int 타입)
        qrRepeatAlarmIdList, // 반복성 QR알람id 리스트 (int 타입)
      };

      await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
        console.log('정보 저장 완료');
        navigation.navigate('Home');
      });

      if (err) console.log(err);
    });

    const instance = axios.create({
      baseURL: 'http://k4c105.p.ssafy.io/api/',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjM0NTY3ODkiLCJpYXQiOjE2MjA5NTgwODEsImV4cCI6MTYyMzU1MDA4MX0.ShjZ5egr9AmY2calidv_jf77DqfRqt3lR05UQLZn8rOVgQuD9wXxCQcw0QKPFm8cRWwCMzoPvW-OqonAZbkHFQ',
      },
    });
    // 삭제 요청
    instance
      .delete(`routine/${route.params.uuid}`)
      .then((res) => console.log('delete response', res.data))
      .catch((err) => console.log(err));
    // 생성 요청
    instance
      .post('routine/', {
        uuid,
        startDate: tempRepeatDateList.length ? tempRepeatDateList[0] : startDate,
        questName,
        startTime,
        endTime,
        alarmTime,
        repeatYoilList,
        category: '기타',
      })
      .then((res) => console.log('post response!', res.data))
      .catch((err) => console.log(err));
  };

  // 모달 활성/비활성
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showStartTimePicker = () => {
    setStartTimeShow(true);
  };
  const showEndTimePicker = () => {
    setEndTimeShow(true);
  };
  const showAlarmTimePicker = () => {
    setAlarmTimeShow(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideStartTimePicker = () => {
    setStartTimeShow(false);
  };
  const hideEndTimePicker = () => {
    setEndTimeShow(false);
  };
  const hideAlarmTimePicker = () => {
    setAlarmTimeShow(false);
  };

  // 날짜 설정
  const handleConfirm = (element) => {
    setStartDate(
      element.getDate() +
        '-' +
        (element.getMonth() * 1 + 1).toString() +
        '-' +
        element.getFullYear(),
    );
    hideDatePicker();
  };

  // 시작시간 설정
  const handleStartConfirm = (element) => {
    setStartTime(element.getHours() + ':' + element.getMinutes() + ':0');
    hideStartTimePicker();
  };

  // 종료시간 설정
  const handleEndConfirm = (element) => {
    setEndTime(element.getHours() + ':' + element.getMinutes() + ':0');
    hideEndTimePicker();
  };

  // 알람시간 설정
  const handleAlarmConfirm = (element) => {
    setAlarmTime(element.getHours() + ':' + element.getMinutes() + ':0');
    hideAlarmTimePicker();
  };

  return (
    <Wrapper>
      <ScrollView>
        {/* section 1 시작 */}
        <Contents>
          <View>
            <Text style={styles.title}>퀘스트 이름</Text>
            <Card style={styles.cardWidth}>
              <TextInput
                onChangeText={(text) => setQuestname(text)}
                style={styles.textInput}
                placeholder="어떤 퀘스트인가요?"
                maxLength={30}>
                {questName}
              </TextInput>
            </Card>
          </View>
        </Contents>
        {/* section 1 끝 */}

        {/* section 2 시작 */}
        <Contents>
          <View>
            <Text style={styles.title}>퀘스트 환경 설정</Text>
            <Card style={styles.cardWidth}>
              {/* 반복 유무 */}
              <SettingWrapper>
                <SettingTitle>반복</SettingTitle>
                <SettingButton onPress={toggleModal} onCancel={() => console.log('@')}>
                  {repeatYoilList.map((value, index) =>
                    value ? (
                      <Text key={index} style={{ opacity: 0.5 }}>
                        {value}{' '}
                      </Text>
                    ) : null,
                  )}
                </SettingButton>
                <ModalComponent showModal={showModal} setShowModal={setShowModal}>
                  <Repreat setShowModal={setShowModal} setIsReapeat={setRepeatYoilList} />
                </ModalComponent>
              </SettingWrapper>

              {/* 날짜 */}
              <SettingWrapper style={{ marginBottom: 0 }}>
                <SettingTitle>일시</SettingTitle>
                <SettingButton onPress={showDatePicker}>
                  <Text style={{ opacity: 0.5 }}>{!startDate ? today : startDate}</Text>
                </SettingButton>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </SettingWrapper>

              {/* 시작, 종료 시간 */}
              <SettingWrapper>
                <SettingTitle></SettingTitle>
                <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <SmallButton onPress={showStartTimePicker}>
                    <Text style={{ opacity: 0.5, fontSize: 12 }}>
                      {!startTime ? '시작 시간' : startTime}
                    </Text>
                  </SmallButton>
                  <DateTimePickerModal
                    isVisible={startTimeShow}
                    mode="time"
                    // is24Hour={true}
                    onConfirm={handleStartConfirm}
                    onCancel={hideStartTimePicker}
                  />
                  <SmallButton onPress={showEndTimePicker}>
                    <Text style={{ opacity: 0.5, fontSize: 12 }}>
                      {!endTime ? '종료 시간' : endTime}
                    </Text>
                  </SmallButton>
                  <DateTimePickerModal
                    isVisible={endTimeShow}
                    // is24Hour={true}
                    mode="time"
                    onConfirm={handleEndConfirm}
                    onCancel={hideEndTimePicker}
                  />
                </View>
              </SettingWrapper>

              {/* 알람 유무 */}
              <SettingWrapper>
                <SettingTitle>알람</SettingTitle>
                <Switch value={isAlarm} onValueChange={() => setIsAlarm(!isAlarm)} color="orange" />
              </SettingWrapper>
              {isAlarm ? (
                <>
                  <SettingButton onPress={showAlarmTimePicker}>
                    <Text style={{ opacity: 0.5, fontSize: 12 }}>
                      {alarmTime === '' ? '알람 시간 설정' : alarmTime}
                    </Text>
                  </SettingButton>
                  <DateTimePickerModal
                    isVisible={alarmTimeShow}
                    // is24Hour={true}
                    mode="time"
                    onConfirm={handleAlarmConfirm}
                    onCancel={hideAlarmTimePicker}
                  />
                </>
              ) : null}

              {/* QR 생성 여부 */}
              <SettingWrapper>
                <SettingTitle>QR 생성</SettingTitle>
                <Switch onValueChange={() => setIsQR(!isQR)} value={isQR} color="orange" />
              </SettingWrapper>
            </Card>
          </View>
        </Contents>
        {/* section 2 끝 */}

        {/* 루틴을 생성하면 qr코드화면으로 넘어가게 + 루틴의  */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.qrImage}
            source={{
              uri: `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${startTime}`,
            }}
          />
        </View>
        <ButtonWrapper
          style={{ marginBottom: 50 }}
          onPress={() => {
            handleCreate();
          }}>
          <Text style={{ color: 'white' }}>퀘스트 생성</Text>
        </ButtonWrapper>
      </ScrollView>

      <NavigationButton navigation={navigation} />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
  },
  routineTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#000',
  },
  qrImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  // 디바이스 크기가 커지면 더 많이 줄어들어야함
  cardWidth: {
    width: deviceWidth - 20 * 1.5,
  },
  textInput: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  qrTextInput: {},
});

export default UpdateRoutineScreen;
