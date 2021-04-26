import React from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TextInput } from 'react-native';
import { Wrapper, ButtonWrapper, Card, Contents } from './styles';
import { deviceWidth } from '@/utils/devicesize';

// 라이브러리
import { Calendar } from 'react-native-calendars';

import NavigationButton from '@/components/common/NavigationButton';

function CreateRoutineScreen({ navigation }) {
  const routine = '운동';
  return (
    <Wrapper>
      <ScrollView>
        <Contents>
          <View>
            <Text style={styles.title}>루틴 이름</Text>
            <Card style={styles.cardWidth}>
              <TextInput
                style={styles.textInput}
                placeholder="어떤 루틴인가요?"
                maxLength={20}></TextInput>
            </Card>
          </View>
        </Contents>
        <Contents>
          <Card style={styles.cardWidth}>
            {/* 반복 유무 */}
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.routineTitle}>반복</Text>
              <TextInput
                style={styles.textInput}
                placeholder="반복 없음"
                maxLength={20}></TextInput>
            </View>

            {/* 날짜 */}
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.routineTitle}>일시</Text>
              <TextInput style={styles.textInput} placeholder="2021.04.26(월)"></TextInput>
            </View>

            {/* 달력(라이브러리 사용법 익히기) */}
            <Calendar theme={{ calendarBackground: '#e3c668' }} />

            {/* 알람 유무 */}
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.routineTitle}>알람</Text>
              <TextInput style={styles.textInput} placeholder="알람 없음"></TextInput>
            </View>
          </Card>
        </Contents>
        {/* 루틴을 생성하면 qr코드화면으로 넘어가게 + 루틴의  */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.qrImage}
            source={{
              uri: `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${routine}.png`,
            }}
          />
        </View>
        <ButtonWrapper>
          <Text>루틴 생성</Text>
        </ButtonWrapper>
      </ScrollView>
      <NavigationButton navigation={navigation} />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#fff',
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
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  // 디바이스 크기가 커지면 더 많이 줄어들어야함
  cardWidth: {
    width: deviceWidth - 40 * 1.5,
  },
  textInput: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CreateRoutineScreen;
