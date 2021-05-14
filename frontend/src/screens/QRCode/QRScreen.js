import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { View, Text, AppRegistry, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { Dimensions } from 'react-native';
import theme from '@/theme';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import {
  makeQRAlarm,
  makeAlarm,
  makeRepeatDate,
  deleteAlarm,
  stopAlarmSound,
} from '@/components/CreateRoutine/AlarmNotifi';
import { yoilReverse } from '@/utils/parsedate';
import axios from 'axios';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.colors.first};
`;

function QRScreen({ navigation }) {
  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [quests, setQuests] = useState({});

  const scanner = useRef('');

  useEffect(() => {
    getAsyncStorage('quests', setQuests);
  }, []);

  const getAsyncStorage = async (storageName, setData) => {
    await AsyncStorage.getItem(storageName, (err, res) => {
      let data = JSON.parse(res);
      setData(data === null ? {} : data); // null 에러 처리

      if (err) console.log(err);
    });
  };

  const onSuccess = async (e) => {
    setResult(e);
    setScan(false);
    setScanResult(true);

    const uuid = e.data;
    let quest = quests[uuid];

    // 존재하는 루틴 인지 확인
    if (quest !== null) {
      // 시작된 루틴 인지 확인
      let [date, month, year] = [...quest.startDate.split('-')];
      if (new Date(year, month * 1 - 1, date * 1) <= new Date()) {
        // QR알람이 존재하는지 확인
        if (quest.qrOnceAlarmIdList.length + quest.qrRepeatAlarmIdList.length !== 0) {
          let isQuit = true;

          // 일회성 QR알람 인지 확인
          if (quest.qrOnceAlarmIdList.length !== 0) {
            // 같은 요일 인지 확인
            if (new Date(year, month * 1 - 1, date * 1).getDay() === new Date().getDay()) {
              deleteAlarm(quest.qrOnceAlarmIdList[0]);
              quest.qrOnceAlarmIdList = [];

              isQuit = true;
            }
          }
          // 반복성 QR알람 인지 확인
          else {
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
              await deleteAlarm(quest.qrRepeatAlarmIdList[i]);

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

              const alarmId = await makeQRAlarm(
                startDate,
                [quest.repeatYoilList[i]],
                quest.questName,
                quest.alarmTime,
              );
              console.log(alarmId);
              quest.qrRepeatAlarmIdList[i] = alarmId[0];
            }
          }

          // QR을 삭제/종료 했다면
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

            // 퀘스트 로그 생성
            date = date.length == 1 ? '0' + date : date;
            month = month.length == 1 ? '0' + month : month;

            const instance = axios.create({
              baseURL: 'http://k4c105.p.ssafy.io/api/',
              headers: {
                Authorization:
                  'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxMjM0NTY3ODkiLCJpYXQiOjE2MjA5NTgwODEsImV4cCI6MTYyMzU1MDA4MX0.ShjZ5egr9AmY2calidv_jf77DqfRqt3lR05UQLZn8rOVgQuD9wXxCQcw0QKPFm8cRWwCMzoPvW-OqonAZbkHFQ',
              },
            });
            instance
              .post('routineLog/', {
                routineId: uuid,
                time: date + '-' + month + '-' + year,
                isSuccess: 'true',
              })
              .then((res) => console.log('post response!', res.data))

              .catch((err) => console.log(err));
          }
        }
      }
    }

    // // 존재하는 루틴 인지 확인
    // if (quest !== null) {
    //   // 시작된 루틴 인지 확인
    //   let [date, month, year] = [...quest.startDate.split('-')];
    //   if (new Date(year, month * 1 - 1, date * 1) <= new Date()) {
    //     // 알람이 존재하는지 확인
    //     if (quest.alarmIdList.length !== 0) {
    //       // 알람이 울린 후이면, 알람 종료
    //       let [hours, minutes, seconds] = [...quest.alarmTime.split(':')];
    //       if (new Date(year, month * 1 - 1, date * 1, hours, minutes, seconds) <= new Date()) {
    //         stopAlarmSound();
    //       }

    //       // 알람이 울리기 전이면, 알람 삭제 및 생성
    //       if (quest.repeatYoilList.length === 0) {
    //         // 일회성
    //         // 기존 알림 삭제
    //         if (new Date(year, month * 1 - 1, date * 1).getDay() === new Date().getDay()) {
    //           if (quest.alarmIdList.length) {
    //             deleteAlarm(quest.alarmIdList[0]);
    //             quest.alarmIdList = [];
    //           }
    //         }
    //       } else {
    //         // 반복성
    //         await Promise.all(
    //           quest.repeatYoilList.map(async (v, i) => {
    //             if (yoilReverse[v] === new Date().getDay()) {
    //               // 기존 알람 삭제
    //               await deleteAlarm(quest.alarmIdList[i]);

    //               // 향후 알람 추가
    //               const startDate = await makeRepeatDate(
    //                 new Date().getDate() +
    //                   '-' +
    //                   (new Date().getMonth() * 1 + 1).toString() +
    //                   '-' +
    //                   new Date().getFullYear(),
    //                 v,
    //               );
    //               quest.repeatDateList[i] = startDate;

    //               const alarmId = await makeAlarm(
    //                 startDate,
    //                 [quest.repeatYoilList[i]],
    //                 quest.questName,
    //                 quest.alarmTime,
    //               );
    //               console.log(alarmId);
    //               quest.alarmIdList[i] = alarmId[0];
    //             }
    //           }),
    //         );
    //       }

    //       // 메모리에 저장
    //       quests[uuid] = quest;
    //       await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
    //         console.log('정보 저장 완료');
    //         navigation.navigate('Home');
    //       });
    //     }
    //   }
    // }
  };

  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  return (
    <>
      {scanResult && (
        <Wrapper>
          <Text style={styles.textTitle}>스캔 결과</Text>
          <View style={scanResult ? styles.scanCardView : styles.cardView}>
            <Text>Type : {result.type}</Text>
            <Text>Result : {result.data}</Text>
            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
            <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
            </TouchableOpacity>
          </View>
          <Text></Text>
        </Wrapper>
      )}

      {scan && (
        <Wrapper>
          <StatusBar></StatusBar>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={(node) => {
              scanner.current = node;
            }}
            onRead={onSuccess}
            bottomContent={
              <View>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => {
                    setScan(false);
                    navigation.navigate('Home');
                  }}>
                  <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </Wrapper>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    padding: 16,
    color: 'black',
  },

  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },

  buttonTouchable: {
    fontSize: 21,
    backgroundColor: theme.colors.second,
    marginTop: 32,

    width: deviceWidth - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
AppRegistry.registerComponent('default', () => QRScreen);

export default QRScreen;
