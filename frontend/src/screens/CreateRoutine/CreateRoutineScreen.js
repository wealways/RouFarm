import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TextInput } from 'react-native';
import {
  Wrapper,
  ButtonWrapper,
  Card,
  Contents,
  SettingWrapper,
  SettingTitle,
  SettingButton,
} from './styles';
import { deviceWidth } from '@/utils/devicesize';

// 라이브러리
import { Calendar, Agenda } from 'react-native-calendars';
import { Switch } from 'react-native-elements';

// 컴포넌트
import ModalComponent from '@/components/common/ModalComponent';
import NavigationButton from '@/components/common/NavigationButton';

function CreateRoutineScreen({ navigation }) {
  // 모달
  const [isReapeat, setIsReapeat] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const routine = '나는 운동이 하고싶다...';
  let date = new Date();
  let today = date.getFullYear() + ' / ' + date.getMonth() + ' / ' + date.getDate();

  return (
    <Wrapper>
      <ScrollView>
        {/* section 1 시작 */}
        <Contents>
          <View>
            <Text style={styles.title}>퀘스트 이름</Text>
            <Card style={styles.cardWidth}>
              <TextInput
                style={styles.textInput}
                placeholder="어떤 퀘스트인가요?"
                maxLength={20}></TextInput>
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
                <SettingButton onPress={openModal}>
                  <Text style={{ opacity: 0.5 }}>반복 없음</Text>
                </SettingButton>
              </SettingWrapper>

              {/* 날짜 */}
              <SettingWrapper>
                <SettingTitle>일시</SettingTitle>
                <SettingButton onPress={openModal}>
                  <Text style={{ opacity: 0.5 }}>{today}</Text>
                </SettingButton>
              </SettingWrapper>

              {/* 알람 유무 */}
              <SettingWrapper>
                <SettingTitle>알람</SettingTitle>
                <Switch value={false} color="orange"></Switch>
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
              uri: `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${routine}`,
            }}
          />
        </View>
        <ButtonWrapper
          style={{ marginBottom: 50 }}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={{ color: 'white' }}>퀘스트 생성</Text>
        </ButtonWrapper>
      </ScrollView>
      {/* 모달 */}
      <ModalComponent showModal={showModal} setShowModal={setShowModal}>
        <Calendar />
        {/* <Agenda /> */}
      </ModalComponent>
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
    width: deviceWidth - 20 * 1.5,
  },
  textInput: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default CreateRoutineScreen;
