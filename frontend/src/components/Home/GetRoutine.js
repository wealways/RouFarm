import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { yoilReverse, yoil } from '../../utils/parsedate';

const DateButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin: 8px 4px;
  background: ${(props) => (props.clickedIdx === props.i ? '#2C5061' : '#FFFAEC')};
  border-radius: 8px;
  width: 80px;
`;

const DateText = styled.Text`
  color: ${(props) => (props.clickedIdx === props.idx ? '#fff' : '#222')};
`;

// 요일 버튼을 누르면 해당 요일에 루틴 uuid를 가져오기
export const getDailyQuests = (quests, date) => {
  const [day1, month1, year1] = date.split('-');

  let uuidList = Object.keys(quests).filter((uuid) => {
    // 일회성 루틴이면, startDate가 date와 같으면 출력
    if (quests[uuid].repeatDateList.length === 0) {
      return date === quests[uuid].startDate;
    }
    // 반복성 루틴이면, startDate가 date보다 작고(이미 시작된 루틴), 같은 요일이면 출력
    else {
      const [day2, month2, year2] = quests[uuid].startDate.split('-');
      // 시작한 루틴인지 확인
      if (new Date(year2, month2 * 1 - 1, day2) <= new Date(year1, month1 * 1 - 1, day1)) {
        const yoil1 = new Date(year1, month1 * 1 - 1, day1).getDay();

        // 같은 요일 루틴인지 확인
        const result = quests[uuid].repeatYoilList.filter((yoil2) => {
          if (yoil1 === yoilReverse[yoil2]) {
            return true;
          }
          return false;
        });
        return result.length === 0 ? false : true;
      }

      return false;
    }
  });

  uuidList = uuidList === null ? [] : uuidList;

  return uuidList;
};

function GetRoutine({ quests, setClickedQuestUuidList }) {
  let date = new Date();
  let listOfDays = new Array(14);

  const [clickedIdx, setClickedIdx] = useState(0);

  for (let i = 0; i < listOfDays.length; i++) {
    listOfDays[i] =
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + i).getDate() +
      '-' +
      (
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + i).getMonth() * 1 +
        1
      ).toString() +
      '-' +
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + i).getFullYear();
  }
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {listOfDays.map((v, i) => (
        <React.Fragment key={i}>
          <DateButton
            style={styles.android}
            clickedIdx={clickedIdx}
            i={i}
            onPress={() => {
              setClickedQuestUuidList(getDailyQuests(quests, v));
              setClickedIdx(i);
            }}>
            <DateText style={styles.yoilText} clickedIdx={clickedIdx} idx={i}>
              {yoil[new Date(v.split('-')[2], v.split('-')[1] * 1 - 1, v.split('-')[0]).getDay()]}
            </DateText>
            <DateText style={styles.dateText} clickedIdx={clickedIdx} idx={i}>
              {v.split('-')[1] + '월 ' + v.split('-')[0] + '일'}
            </DateText>
          </DateButton>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  android: {
    elevation: 6,
  },
  dateText: {
    fontSize: 12,
  },
  yoilText: {
    fontSize: 11,
  },
});

export default GetRoutine;
