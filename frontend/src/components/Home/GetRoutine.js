import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { yoilReverse, yoil } from '../../utils/parsedate';

const DateButton = styled.Pressable`
  padding: 8px;
  margin: 0 4px;
  background: ${(props) => (props.clickedIdx === props.i ? '#2C5061' : '#FFFAEC')};
  border-radius: 8px;
  width: 80px;
`;

// 요일 버튼을 누르면 해당 요일에 퀘스트 uuid를 가져오기
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
  let sevenDays = new Array(8);

  const [clickedIdx, setClickedIdx] = useState(0);

  for (let i = 0; i < sevenDays.length; i++) {
    sevenDays[i] =
      date.getDate() + i + '-' + (date.getMonth() * 1 + 1).toString() + '-' + date.getFullYear();
  }
  console.log(sevenDays);
  return (
    <ScrollView horizontal={true}>
      {sevenDays.map((v, i) => (
        <React.Fragment key={i}>
          <DateButton
            clickedIdx={clickedIdx}
            i={i}
            onPress={() => {
              setClickedQuestUuidList(getDailyQuests(quests, v));
              setClickedIdx(i);
            }}>
            <Text style={{ color: '#000' }}>
              {yoil[new Date(v.split('-')[2], v.split('-')[1] * 1 - 1, v.split('-')[0]).getDay()]}
            </Text>
            <Text style={{ color: '#000' }}>{v.split('-')[1] + '월' + v.split('-')[0] + '일'}</Text>
          </DateButton>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

export default GetRoutine;
