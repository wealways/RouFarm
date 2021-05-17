import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { View, Text, AppRegistry, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { Dimensions } from 'react-native';
import theme from '@/theme';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { instance } from '@/api';
import { JwtConsumer } from '@/contexts/jwt';
import { yoilReverse } from '@/utils/parsedate';

// 컴포넌트
import {
  makeQRAlarm,
  makeAlarm,
  makeRepeatDate,
  deleteAlarm,
  stopAlarmSound,
} from '@/components/CreateRoutine/AlarmNotifi';

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

  const onSuccess = async (e, jwt) => {
    console.log(jwt);
    setResult(e);
    setScan(false);
    setScanResult(true);

    const uuid = e.data;
    let quest = quests[uuid];

    // 존재하는 루틴 인지 확인
    if (quest !== undefined) {
      // 시작된 루틴 인지 확인
      let [date, month, year] = [...quest.startDate.split('-')];
      if (new Date(year, month * 1 - 1, date * 1) <= new Date()) {
        let isQuit = true;

        // 일회성 QR
        if (quest.repeatYoilList.length === 0) {
          // 오늘 알림이 맞으면
          if (new Date(year, month * 1 - 1, date * 1).getDay() === new Date().getDay()) {
            // QR알람이 존재하는지 확인
            if (quest.qrOnceAlarmIdList.length !== 0) {
              isQuit = true;
              deleteAlarm(quest.qrOnceAlarmIdList[0]);
              quest.qrOnceAlarmIdList = [];
            }

            // quests에 quest 삭제
            delete quests[uuid];
            instance
              .delete(`routine/${uuid}`, {
                headers: {
                  Authorization: jwt,
                },
              })
              .then((res) => console.log('delete response', res.data))
              .catch((err) => console.log(err));
          }
        } else {
          // 반복성 QR
          let i = -1;

          quest.repeatYoilList.map((val, idx) => {
            // 루틴 완료!
            // 같은 요일 인지 확인
            if (yoilReverse[val] === new Date().getDay()) {
              isQuit = true;
              i = idx;
            }
          });

          // 오늘 루틴이 맞으면
          if (i !== -1) {
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
            if (quest.qrRepeatAlarmIdList !== 0) {
              // 기존 알람 삭제
              await deleteAlarm(quest.qrRepeatAlarmIdList[i]);
              // 향후 알람 추가
              const alarmId = await makeQRAlarm(
                alarmDate,
                [quest.repeatYoilList[i]],
                quest.questName,
                quest.alarmTime,
              );
              console.log(alarmId);
              quest.qrRepeatAlarmIdList[i] = alarmId[0];
            }

            // quests 수정
            quests[uuid] = quest;
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
          await AsyncStorage.setItem('quests', JSON.stringify(quests), () => {
            console.log('정보 저장 완료');
            navigation.navigate('Home');
          });

          // 퀘스트 로그 생성
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
    }
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
          <JwtConsumer>
            {({ JWT }) => (
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                ref={(node) => {
                  scanner.current = node;
                }}
                onRead={(e) => onSuccess(e, JWT.jwt)}
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
            )}
          </JwtConsumer>
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
