import React from 'react';
import { Image, StyleSheet, ScrollView, Text, View, TextInput } from 'react-native';
import { Wrapper, Card, Contents } from './styles';
import { deviceWidth } from '@/utils/devicesize';

import NavigationButton from '@/components/common/NavigationButton';

function CreateRoutineScreen({ navigation }) {
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
        {/* 루틴을 생성하면 qr코드화면으로 넘어가게 */}
        <View>
          <Image
            style={styles.qrImage}
            source={{
              uri: 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=hello+world.png',
            }}
          />
        </View>
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
  qrImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  cardWidth: {
    width: deviceWidth - 40 * 1.5,
  },
  textInput: {
    width: '100%',
    minWidth: 200,
  },
});

export default CreateRoutineScreen;
