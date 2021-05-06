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
import Reapreat from '@/components/CreateRoutine/Reapeat';
import {
  setAlarm,
  viewAlarms,
  deleteAlarm,
  stopAlarmSound,
} from '@/components/CreateRoutine/AlarmNotifi';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';

const dayOfMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const yoil = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

const yoilReverse = {
  일: 0,
  월: 1,
  화: 2,
  수: 3,
  목: 4,
  금: 5,
  토: 6,
};

const now = new Date();
const today =
  now.getFullYear() +
  '.' +
  (now.getMonth() * 1 + 1).toString() +
  '.' +
  now.getDate() +
  '(' +
  yoil[now.getDay()] +
  ')';

function CreateRoutineScreen({ navigation }) {
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
  const [questName, setQuestname] = useState('');
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [isReapeat, setIsReapeat] = useState([]);
  const [qrName, setQRName] = useState('');

  // 스위치 상태
  const [isQR, setIsQR] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const [fireDate, setFireDate] = useState('');

  // 퀘스트 생성
  const handleCreate = () => {
    var quest = AsyncStorage.getItem('quest');
    // 미래의 나에게..
    /**
     * Asnyc Storage는 JSON형식이다.
     * 즉, 넣어줄때는 stringify로 스트링화하여 넣어야하고, 빼올때는 parse를 통해 빼올 수 있다.
     * 우리는 특정 날짜에 해당하는 데이터들을 뽑아와야하니까 아래의 구조로 데이터를 넣어줘야할듯하다.
     * {
     * "date" : [
     *     {
     *     "key":"value",
     *     "key":"value",
     *     "key":"value",
     *     "key":"value
     *     },
     *     {
     *     "key":"value",
     *     "key":"value",
     *     "key":"value",
     *     "key":"value
     *     },
     * ]
     * }
     */
    AsyncStorage.setItem(
      'quest',
      quest
        ? (quest += JSON.stringify([{ questName, date, startTime, endTime, isReapeat }]))
        : [JSON.stringify([{ questName, date, startTime, endTime, isReapeat }])],
      () => console.log('정보 저장 완료'),
    );
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
    console.log(element);
    let temp = JSON.stringify(element).slice(1, 11);
    temp = temp.split('-');
    temp = temp[2] + '-' + temp[1] + '-' + temp[0];
    setFireDate(temp);

    setDate(
      element.getFullYear() +
        '.' +
        (element.getMonth() * 1 + 1).toString() +
        '.' +
        element.getDate() +
        '(' +
        yoil[element.getDay()] +
        ')',
    );
    hideDatePicker();
  };

  // 시작시간 설정
  const handleStartConfirm = (element) => {
    const time =
      element.getHours() > 12
        ? 'PM ' + (element.getHours() % 12) + ':' + element.getMinutes()
        : 'AM ' + element.getHours() + ':' + element.getMinutes();
    setStartTime(time);
    console.log(time);
    hideStartTimePicker();
  };

  // 종료시간 설정
  const handleEndConfirm = (element) => {
    const time =
      element.getHours() > 12
        ? 'PM ' + (element.getHours() % 12) + ':' + element.getMinutes()
        : 'AM ' + element.getHours() + ':' + element.getMinutes();
    setEndTime(time);
    console.log(time);

    hideEndTimePicker();
  };

  // 알람시간 설정
  const handleAlarmConfirm = (element) => {
    let time = JSON.stringify(element);
    time = time.slice(12, 20);
    setFireDate(fireDate + ' ' + time);
    setAlarmTime(time);
    hideAlarmTimePicker();
  };

  // 알람 생성
  const makeAlarm = () => {
    // 알람이 있을때 -> 반복 유/무에 따라 결과가 달라짐
    if (isAlarm) {
      if (isReapeat.length === 0) {
        console.log('is Repeat!!@@@@@@@@@@@@@@@');
        setAlarm({
          fire_date: fireDate,
          title: questName,
          message: questName,
        });
      } else if (isReapeat.length > 0) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@');
        let day = parseInt(fireDate.slice(0, 2));
        let month = parseInt(fireDate.slice(3, 5));
        let restOfFireDate = fireDate.slice(5);
        let yoilNumber = yoilReverse[date.slice(-2, -1)]; // 현재 요일을 숫자로 변환(일~토 -> 0~6)

        console.log(yoilNumber);

        // 반복 요일별로 순회하면서 각 요일에 해당하는 알람을 설정
        isReapeat.map((value) => {
          // 가장 가까운 반복 요일(숫자) - 현재 요일(숫자)
          let gap = yoilReverse[value] - yoilNumber;
          console.log(gap);
          let tempDay = day;
          let tempMonth = month;

          // 갭이 0보다 작으면 현재요일(숫자)이 반복요일(숫자)을 지났다는 의미이므로 --> 현재요일(숫자) + gap + 7
          // 현재 요일보다 반복해야하는 요일 더 뒤면 현재요일(숫자) + gap
          gap <= 0 ? (tempDay += gap + 7) : (tempDay += gap);
          if (dayOfMonth[month] < tempDay) {
            tempDay -= dayOfMonth[month];
            if (month === 12) {
              tempMonth = 1;
            } else tempMonth++;
          }
          let tempFireDate = tempDay.toString() + '-' + tempMonth.toString() + restOfFireDate;
          setAlarm({
            fire_date: tempFireDate,
            title: questName,
            message: questName,
            schedule_type: 'repeat',
          });
        });
      }
    }
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
                <SettingButton onPress={toggleModal} onCancel={() => console.log('@')}>
                  {isReapeat.map((value, index) =>
                    value ? (
                      <Text key={index} style={{ opacity: 0.5 }}>
                        {value}{' '}
                      </Text>
                    ) : null,
                  )}
                </SettingButton>
                <ModalComponent showModal={showModal} setShowModal={setShowModal}>
                  <Reapreat setShowModal={setShowModal} setIsReapeat={setIsReapeat} />
                </ModalComponent>
              </SettingWrapper>

              {/* 날짜 */}
              <SettingWrapper style={{ marginBottom: 0 }}>
                <SettingTitle>일시</SettingTitle>
                <SettingButton onPress={showDatePicker}>
                  <Text style={{ opacity: 0.5 }}>{!date ? today : date}</Text>
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

              {/* QR 생성 여부 */}
              <SettingWrapper>
                <SettingTitle>QR 생성</SettingTitle>
                <Switch onValueChange={() => setIsQR(!isQR)} value={isQR} color="orange" />
              </SettingWrapper>
              {isQR ? (
                <>
                  <TextInput
                    style={styles.qrTextInput}
                    placeholder="QR 코드의 이름을 기입해주세요"
                    maxLength={20}></TextInput>
                </>
              ) : null}
            </Card>
          </View>
        </Contents>
        {/* section 2 끝 */}

        {/* 루틴을 생성하면 qr코드화면으로 넘어가게 + 루틴의  */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.qrImage}
            source={{
              uri: `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${qrName}`,
            }}
          />
        </View>
        <ButtonWrapper
          style={{ marginBottom: 50 }}
          onPress={() => {
            // handleCreate();
            makeAlarm();
            navigation.navigate('Home');
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
