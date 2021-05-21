import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, ScrollView, Text, View, TextInput, Pressable } from 'react-native';

import {
  Wrapper,
  ButtonWrapper,
  Card,
  Contents,
  SettingWrapper,
  SmallButton,
  SettingTitle,
  SettingButton,
  HashTagButton,
} from './styles';
import { deviceWidth } from '@/utils/devicesize';

// 라이브러리
import { Switch } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { instance } from '@/api';
import { Tooltip } from 'react-native-elements';
import { JwtConsumer } from '@/contexts/jwt';
import AwesomeAlert from 'react-native-awesome-alerts';

// 컴포넌트
import ModalComponent from '@/components/common/ModalComponent';
import Repreat from '@/components/CreateRoutine/Repeat';
import {
  deleteAlarm,
  makeQRAlarm,
  makeAlarm,
  makeRepeatDate,
} from '@/components/CreateRoutine/AlarmNotifi';
import QuestionMarkSvg from '../../assets/images/question-mark.svg';
import { pushQR } from '@/utils/KakaoLink';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import theme from '../../theme';

const today =
  new Date().getDate() +
  '-' +
  (new Date().getMonth() * 1 + 1).toString() +
  '-' +
  new Date().getFullYear();

const tagName = ['일상', '자기개발', '건강', '기타'];

function UpdateRoutineScreen({ navigation, route }) {
  // 모달
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const toggleRepeatModal = () => {
    setShowRepeatModal((prev) => !prev);
  };
  const [showHashTagModal, setShowHashTagModal] = useState(false);
  const toggleHashTagModal = () => {
    setShowHashTagModal((prev) => !prev);
  };

  // Alert라이브러리
  const [showAlert, setShowAlert] = useState(false);
  const showAlertModal = () => {
    setShowAlert(true);
  };
  const hideAlertModal = () => {
    setShowAlert(false);
  };

  // 모달 상태
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTimeShow, setStartTimeShow] = useState(false);
  const [endTimeShow, setEndTimeShow] = useState(false);
  const [alarmTimeShow, setAlarmTimeShow] = useState(false);
  const [createdUuid, setCreatedUuid] = useState(0);

  // 생성시 넘길 데이터
  const [questName, setQuestname] = useState(route.params.quest.questName);
  const [startDate, setStartDate] = useState(route.params.quest.startDate);
  const [startTime, setStartTime] = useState(route.params.quest.startTime);
  const [endTime, setEndTime] = useState(route.params.quest.endTime);
  const [alarmTime, setAlarmTime] = useState(route.params.quest.alarmTime);
  const [repeatYoilList, setRepeatYoilList] = useState(route.params.quest.repeatYoilList);
  const [hashTag, setHashTag] = useState(route.params.quest.hashTag);

  // 스위치 상태
  const [isQR, setIsQR] = useState(
    route.params.quest.qrOnceAlarmIdList.length + route.params.quest.qrRepeatAlarmIdList.length !==
    0,
  );
  const [isAlarm, setIsAlarm] = useState(alarmTime !== '');
  const [mode, setMode] = useState('');

  useEffect(async () => {
    await AsyncStorage.getItem('mode', (err, res) => {
      setMode(res);
      if (res === 'hard') {
        setIsAlarm(true);
        setIsQR(true);
      }
    });
  }, []);

  // 퀘스트 생성
  const handleCreate = async (jwt) => {
    if (questName === '') {
      Alert.alert('루틴이름을 기입해주세요 !');
      return;
    } else if (isQR && !isAlarm) {
      Alert.alert('알람을 설정해주세요 !');
      return;
    } else if (isQR && isAlarm && alarmTime === '') {
      Alert.alert('알람 시간을 설정해주세요 !');
      return;
    } else if (isAlarm && alarmTime === '') {
      Alert.alert('알람 시간을 설정해주세요 !');
      return;
    } else if (
      alarmTime.split(':')[0] <= new Date().getHours() &&
      alarmTime.split(':')[1] <= new Date().getMinutes() &&
      alarmTime.split(':')[2] < new Date().getSeconds()
    ) {
      Alert.alert('알람 시간이 과거로 설정되었습니다.');
      return;
    }

    // 기존의 알람 제거
    await route.params.quest.alarmIdList.map((v) => deleteAlarm(v));
    await route.params.quest.qrOnceAlarmIdList.map((v) => deleteAlarm(v));
    await route.params.quest.qrRepeatAlarmIdList.map((v) => deleteAlarm(v));
    console.log('delete alarm!');

    // 퀘스트 uuid 생성
    let uuid = parseInt(Math.random() * Math.pow(10, 16));
    setCreatedUuid(uuid);

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
        hashTag,
      };

      await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
        console.log('정보 저장 완료');

        if (isQR) {
          showAlertModal();
        } else {
          navigation.navigate('Home');
        }
      });

      if (err) console.log(err);
    });

    // header에 jwt토큰 삽입
    instance.defaults.headers.common['Authorization'] = jwt;

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
        category: hashTag,
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
            <Text style={styles.title}>루틴 이름</Text>
            <Card style={styles.cardWidth}>
              <TextInput
                onChangeText={(text) => setQuestname(text)}
                style={styles.textInput}
                value={questName}
                placeholder="어떤 루틴인가요?"
                placeholderTextColor="#d2e3e6"
                maxLength={30}></TextInput>
            </Card>
          </View>
        </Contents>
        {/* section 1 끝 */}

        {/* section 2 시작 */}
        <Contents>
          <View>
            <Text style={styles.title}>루틴 설정</Text>
            <Card style={styles.cardWidth}>
              {/* 반복 유무 */}
              <SettingWrapper>
                <SettingTitle>반복</SettingTitle>
                <SettingButton onPress={toggleRepeatModal} onCancel={() => console.log('@')}>
                  {repeatYoilList.map((value, index) =>
                    value ? (
                      <Text key={index} style={styles.buttonText}>
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
                  <Text style={styles.buttonText}>
                    {!startDate
                      ? `${today.split('-')[2]}.${today.split('-')[1]}.${today.split('-')[0]}`
                      : `${startDate.split('-')[2].slice(2)}년 ${startDate.split('-')[1]}월 ${startDate.split('-')[0]
                      }일`}
                  </Text>
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
                    <Text style={styles.buttonTimeText}>
                      {!startTime
                        ? '시작 시간'
                        : startTime.split(':')[0] > 12
                          ? `오후 ${startTime.split(':')[0] * 1 - 12}시 ${startTime.split(':')[1]}분`
                          : `오전 ${startTime.split(':')[0]}시 ${startTime.split(':')[1]}분`}
                    </Text>
                  </SmallButton>
                  <Text style={styles.buttonText}>-</Text>
                  <SmallButton onPress={showEndTimePicker}>
                    <Text style={styles.buttonTimeText}>
                      {!endTime
                        ? '종료 시간'
                        : endTime.split(':')[0] > 12
                          ? `오후 ${endTime.split(':')[0] * 1 - 12}시 ${endTime.split(':')[1]}분`
                          : `오전 ${endTime.split(':')[0]}시 ${endTime.split(':')[1]}분`}
                    </Text>
                  </SmallButton>
                  <DateTimePickerModal
                    isVisible={startTimeShow}
                    mode="time"
                    // is24Hour={true}
                    onConfirm={handleStartConfirm}
                    onCancel={hideStartTimePicker}
                  />
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
                  <Text style={styles.buttonText}>{hashTag ? hashTag : null}</Text>
                </SettingButton>

                <ModalComponent showModal={showHashTagModal} setShowModal={setShowHashTagModal}>
                  <>
                    {tagName.map((v, i) => (
                      <HashTagButton
                        key={i}
                        onPress={() => {
                          setHashTag(v);
                          toggleHashTagModal();
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2e2e2e' }}>
                          {v}
                        </Text>
                      </HashTagButton>
                    ))}
                  </>
                </ModalComponent>
              </SettingWrapper>

              {mode === 'hard' ? (
                <>
                  <SettingWrapper>
                    <Text style={styles.settingTitle}>QR 생성</Text>
                    <Pressable hitSlop={40} style={{ position: 'absolute', top: 8, left: 90 }}>
                      <Tooltip
                        width={300}
                        height={150}
                        popover={
                          <Text style={{ color: theme.colors.text.first }}>
                            {`루틴을 완료하기 위한 QR코드를 발급합니다.
                            
QR을 체크하면 알람이 울릴 때 QR을 사용하여 루틴을 성공시킬 수 있습니다.`}
                          </Text>
                        }>
                        <QuestionMarkSvg width={14} height={14} fill={'orange'} />
                      </Tooltip>
                    </Pressable>
                    <Switch
                      onValueChange={() => {
                        Alert.alert('하드모드에서는 QR 생성이 필수입니다!');
                      }}
                      value={isQR}
                      color="orange"
                    />
                  </SettingWrapper>

                  <SettingWrapper>
                    <Text style={styles.settingTitle}>알람</Text>
                    <Pressable style={{ position: 'absolute', top: 8, left: 60 }} hitSlop={40}>
                      <Tooltip
                        width={300}
                        height={100}
                        popover={
                          <Text style={{ color: theme.colors.text.first }}>
                            {'우측 버튼을 눌러 알람 시간을 설정할 수 있습니다.'}
                          </Text>
                        }>
                        <QuestionMarkSvg width={14} height={14} fill={'orange'} />
                      </Tooltip>
                    </Pressable>
                    <Switch
                      value={isAlarm}
                      onValueChange={() => {
                        Alert.alert('하드모드에서는 알람 생성이 필수입니다!');
                      }}
                      color="orange"
                    />
                  </SettingWrapper>
                </>
              ) : (
                <>
                  <SettingWrapper>
                    <Text style={styles.settingTitle}>QR 생성</Text>
                    <Pressable style={{ position: 'absolute', top: 8, left: 90 }} hitSlop={40}>
                      <Tooltip
                        width={300}
                        height={150}
                        popover={
                          <Text style={{ color: theme.colors.text.first }}>
                            {`루틴을 완료하기 위한 QR코드를 발급합니다.
                            
QR을 체크하면 알람이 울릴 때 QR을 사용하여 루틴을 성공시킬 수 있습니다.`}
                          </Text>
                        }>
                        <QuestionMarkSvg width={14} height={14} fill={'orange'} />
                      </Tooltip>
                    </Pressable>
                    <Switch
                      onValueChange={() => {
                        setIsQR(!isQR);
                        if (isQR) {
                          setIsAlarm(!isAlarm);
                        }
                      }}
                      value={isQR}
                      color="orange"
                    />
                  </SettingWrapper>

                  <SettingWrapper>
                    <Text style={styles.settingTitle}>알람</Text>
                    <Pressable style={{ position: 'absolute', top: 8, left: 60 }} hitSlop={40}>
                      <Tooltip
                        width={300}
                        height={100}
                        popover={
                          <Text style={{ color: theme.colors.text.first }}>
                            {'우측 버튼을 눌러 알람 시간을 설정할 수 있습니다.'}
                          </Text>
                        }>
                        <QuestionMarkSvg width={14} height={14} fill={'orange'} />
                      </Tooltip>
                    </Pressable>
                    <Switch
                      value={isAlarm}
                      onValueChange={() => setIsAlarm(!isAlarm)}
                      color="orange"
                    />
                  </SettingWrapper>
                </>
              )}
              {isAlarm ? (
                <>
                  <SettingButton onPress={showAlarmTimePicker}>
                    <Text style={styles.buttonTimeText}>
                      {!alarmTime
                        ? '알람 설정'
                        : alarmTime.split(':')[0] > 12
                          ? `오후 ${alarmTime.split(':')[0] * 1 - 12}시 ${alarmTime.split(':')[1]}분`
                          : `오전 ${alarmTime.split(':')[0]}시 ${alarmTime.split(':')[1]}분`}
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
        <JwtConsumer>
          {({ JWT }) => (
            <ButtonWrapper
              style={{ marginBottom: 50 }}
              onPress={() => {
                handleCreate(JWT.jwt);
              }}>
              <Text style={{ color: 'white' }}>퀘스트 생성</Text>
            </ButtonWrapper>
          )}
        </JwtConsumer>
      </ScrollView>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="루틴 생성 완료"
        message="QR코드를 공유해주세요!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="홈으로"
        confirmText="공유하기"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlertModal();
          navigation.navigate('Home');
        }}
        onConfirmPressed={() => {
          pushQR(
            createdUuid.toString(),
            `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${createdUuid}`,
            `chart?cht=qr&chs=200x200&chl=${createdUuid}`,
          );
          navigation.navigate('Home');
        }}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'DungGeunMo',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
    marginBottom: 8,
  },
  settingTitle: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.text.first,
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
    color: '#f2f3f6',
  },
  buttonText: {
    color: theme.colors.text.first,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonTimeText: {
    color: theme.colors.text.first,
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default UpdateRoutineScreen;
