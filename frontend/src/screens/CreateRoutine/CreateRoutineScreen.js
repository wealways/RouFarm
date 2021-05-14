import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';

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

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import { makeQRAlarm, makeAlarm, makeRepeatDate } from '../../components/CreateRoutine/AlarmNotifi';

const today =
  new Date().getDate() +
  '-' +
  (new Date().getMonth() * 1 + 1).toString() +
  '-' +
  new Date().getFullYear();

const tagName = ['일상', '자기개발', '건강'];

function CreateRoutineScreen({ navigation }) {
  // 모달
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const toggleRepeatModal = () => {
    setShowRepeatModal((prev) => !prev);
  };
  const [showHashTagModal, setShowHashTagModal] = useState(false);
  const toggleHashTagModal = () => {
    setShowHashTagModal((prev) => !prev);
  };

  // 모달 상태
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTimeShow, setStartTimeShow] = useState(false);
  const [endTimeShow, setEndTimeShow] = useState(false);
  const [alarmTimeShow, setAlarmTimeShow] = useState(false);

  // 생성시 넘길 데이터
  const [questName, setQuestname] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [repeatYoilList, setRepeatYoilList] = useState([]);
  const [hashTag, setHashTag] = useState('');

  // 스위치 상태
  const [isQR, setIsQR] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  // 퀘스트 생성
  const handleCreate = async () => {
    // 퀘스트 uuid 생성
    let uuid = parseInt(Math.random() * Math.pow(10, 16));

    // 알람 생성
    let alarmIdList = [];
    let qrOnceAlarmIdList = [];
    let qrRepeatAlarmIdList = [];

    if (isAlarm) {
      if (isQR) {
        if (repeatYoilList.length === 0) {
          console.log('일회성 QR 알람 생성');
          qrOnceAlarmIdList = await makeQRAlarm(startDate, repeatYoilList, questName, alarmTime);
        } else {
          console.log('반복성 QR 알람 생성');
          qrRepeatAlarmIdList = await makeQRAlarm(startDate, repeatYoilList, questName, alarmTime);
        }
      } else {
        console.log('QR 없는 알람 생성');
        alarmIdList = await makeAlarm(startDate, repeatYoilList, questName, alarmTime);
      }
    }

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
      if (quests === null) quests = {};

      quests[uuid] = {
        startDate: tempRepeatDateList.length ? tempRepeatDateList[0] : startDate,
        questName,
        startTime,
        endTime,
        alarmTime,
        repeatYoilList,
        repeatDateList,
        hashTag: hashTag ? hashTag : '기타',
        qrOnceAlarmIdList,
        qrRepeatAlarmIdList,
        alarmIdList,
      };

      await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
        console.log('정보 저장 완료');
        navigation.navigate('Home');
      });

      if (err) console.log(err);
    });
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
                maxLength={30}></TextInput>
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
                <SettingButton onPress={toggleRepeatModal} onCancel={() => console.log('@')}>
                  {repeatYoilList.map((value, index) =>
                    value ? (
                      <Text key={index} style={{ opacity: 0.5 }}>
                        {value}{' '}
                      </Text>
                    ) : null,
                  )}
                </SettingButton>
                <ModalComponent showModal={showRepeatModal} setShowModal={setShowRepeatModal}>
                  <Repreat
                    setShowModal={setShowRepeatModal}
                    setRepeatYoilList={setRepeatYoilList}
                  />
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

              {/* 해시태그 */}
              <SettingWrapper>
                <SettingTitle>해시태그</SettingTitle>
                <SettingButton onPress={toggleHashTagModal} onCancel={() => console.log('@')}>
                  <Text>{hashTag ? hashTag : null}</Text>
                </SettingButton>

                <ModalComponent showModal={showHashTagModal} setShowModal={setShowHashTagModal}>
                  <>
                    {tagName.map((v, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setHashTag(v);
                          toggleHashTagModal();
                        }}>
                        <Text>{v}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                </ModalComponent>
              </SettingWrapper>

              {/* QR 생성 여부 */}
              <SettingWrapper>
                <SettingTitle>QR 생성</SettingTitle>
                <Switch onValueChange={() => setIsQR(!isQR)} value={isQR} color="orange" />
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
                      {!alarmTime ? '알람 시간 설정' : alarmTime}
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
            </Card>
          </View>
        </Contents>
        {/* section 2 끝 */}

        {/* 루틴을 생성하면 qr코드화면으로 넘어가게 + 루틴의  */}
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.qrImage}
            source={{
              uri: 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=1018023613188393',
            }}
          />
        </View> */}
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

export default CreateRoutineScreen;
