import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import {
  View,
  Text,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

import { Dimensions } from 'react-native';
import theme from '@/theme';

// 유틸
import AsyncStorage from '@react-native-community/async-storage';
import { setAlarm, setNofication, deleteAlarm } from '@/components/CreateRoutine/AlarmNotifi';

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
      console.log(data);
      if (err) console.log(err);
    });
  };

  const onSuccess = (e) => {
    // const check = e.data.substring(0, 4);
    // console.log('scanned data' + check);
    // 링크에 연결할 수 있으면 링크 열기
    // if (check === 'http') {
    //   Linking.openURL(e.data).catch((err) => console.error('An error occured', err));
    // }
    setResult(e);
    setScan(false);
    setScanResult(true);

    const uuid = e.data;
    let quest = quests[uuid];

    let [date, month, year] = quest.startDate.split('-');
    if (new Date(year, month, date) <= new Date()) {
      quest.repeatDate.map((v, i) => {
        [date, month, year] = v.startDate.split('-');
        if (new Date(year, month, date).getDay() === new Date().getDay()) {
          // 알람 삭제, 추가
        }
      });
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
