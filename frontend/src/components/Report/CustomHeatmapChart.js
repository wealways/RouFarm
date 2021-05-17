import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import HeatmapContext from '@/contexts/Report/Heatmap';


const WeekBox = styled.Text`
  width:25px;
  height:25px;
  margin:2.5px;
`
const Custombox = styled.TouchableOpacity`
  border-radius:5px;
  width:25px;
  height:25px;
  /* background-color:#ebedf0;ebedf0 */
  background-color:${({ boxColor }) => boxColor >= 100 ? '#216e39' : boxColor >= 50 ? '#30a14e' : boxColor > 0 ? '#9be9a8' : boxColor == 0 ? '#ff0101' : boxColor == -1 ? '#ebedf0' : '#fff'};
  margin:2px;
`
const Weekline = styled.View`
  display:flex;
  flex-direction:row;

`



// 한달 데이터 -10은 아예 없는 날 / -1는 루틴 안만든 날 / 0은 루틴 하나도 안한 날
const INITIAL_MONTHDATA = [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10]
const CustomHeatmapChart = ({ navigation }) => {

  const [monthdata, setMonthdata] = useState(INITIAL_MONTHDATA);
  const { heatmap, rateDispatch } = useContext(HeatmapContext);
  const [tempD, setTempD] = useState(0);
  const yoil = ['월', '화', '수', '목', '금', '토', '일']

  useEffect(() => {
    // 한달 데이터  -1는 루틴 안만든 날 / 0~100은 루틴 하나도 안한 날 API
    const data = {
      '2021-05': [100, 100, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      '2021-04': [-1, 0, 10, 50, 100, 3, 0, 8, 6, -1, 0, 10, 100, 12, 99, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 75, 0, 0, 0, 0],
      '2021-03': [-1, -1, -1, 50, 100, 3, 0, 8, 6, -1, 0, 10, 100, 12, 99, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 75, 0, 0, 0, 0, 1]
    }

    const monthAPI = {
      '2021-05': {
        '월간수확': [100, 100, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        '해쉬태그별': {
          '건강': [
            { id: 1, content: '조깅', cnt: 20, rate: 0.7 },
            { id: 2, content: '필라테스가기', cnt: 4, rate: 1 },
          ],
          '자기개발': [
            { id: 1, content: '1일1커밋', cnt: 30, rate: 0.8 },
            { id: 2, content: '독서', cnt: 8, rate: 0.5 },
          ],
          '일상': [
            { id: 1, content: '빨래', cnt: 4, rate: 1 },
            { id: 2, content: '아침에 바로 일어나기', cnt: 30, rate: 0.8 },
            { id: 2, content: '야식안먹기', cnt: 30, rate: 0.4 },
          ],
          '없음': [
            { id: 1, content: '멍때리기', cnt: 30, rate: 1 },
            { id: 2, content: '숨쉬기', cnt: 30, rate: 0.8 },
          ]
        }
      }
    }

    const weekAPI = {
      '2021-05-w1': {
        '실패리스트': [
          { id: 1, routine: '코딩 테스트 문제 풀기1', tag: '자기개발' },
          { id: 2, routine: '헬스장 가기1', tag: '건강' },
          { id: 3, routine: '명상하기1', tag: '일상' },
          { id: 4, routine: '게임1', tag: '없음' },
          { id: 4, routine: '게임1', tag: '없음' },
        ],
        '요일별평균': {
          '전체평균': [
            { x: "Mon", y: 59 },
            { x: "Tue", y: 70 },
            { x: "Wen", y: 69 },
            { x: "Thu", y: 100 },
            { x: "Fri", y: 30 },
            { x: "Sat", y: 100 },
            { x: "Sun", y: 100 }
          ],
          '평균': [
            { x: "Mon", y: 69 },
            { x: "Tue", y: 20 },
            { x: "Wen", y: 100 },
            { x: "Thu", y: 100 },
            { x: "Fri", y: 45 },
            { x: "Sat", y: 100 },
            { x: "Sun", y: 70 }
          ]
        }
      }
    }

    const dailyAPI = [
      { id: 1, routine: '코딩 테스트 문제 풀기', tag: '자기개발', completed: false },
      { id: 2, routine: '헬스장 가기', tag: '건강', completed: true },
      { id: 3, routine: '명상하기', tag: '일상', completed: true },
      { id: 3, routine: '명상하기', tag: '일상', completed: true },
      { id: 3, routine: '명상하기', tag: '일상', completed: true },
    ]




    let dataInx = Object.keys(data).indexOf(heatmap.date)
    const Ddate = new Date(Object.keys(data)[dataInx])
    const day = Ddate.getDay() - 1
    setTempD(day)
    const lastdate = new Date(Ddate.getFullYear(), Ddate.getMonth() + 1, 0).getDate();
    let sumV = 0
    let cnt = 0
    const update = INITIAL_MONTHDATA.map((d, i) => {
      if (i < day) {
        return d
      } else if (i < lastdate + day) {
        const temp = Object.values(data)[dataInx][i - day]
        if (temp >= 0) {
          sumV += temp
          cnt += 1
        }
        return Object.values(data)[dataInx][i - day]
      } else {
        return d
      }
    })
    setMonthdata(update)
    rateDispatch(Math.round(sumV / cnt))
  }, [heatmap.date]);


  const month = [0, 1, 2, 3, 4, 5]
  const week = [0, 1, 2, 3, 4, 5, 6]

  // 일일 리포트
  const _onPress = (w, d) => {

    let day = w * 7 + d - tempD + 1;
    day = day >= 10 ? `${day}` : '0' + day;
    const date = `${heatmap.date}-${day}`
    if (isNaN(new Date(date))) {
      return
    } else {
      navigation.navigate('Hide',
        { screen: 'Daily', params: { date: date } });
      console.log('here', date)
    }
  };


  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        {yoil.map((y, idx) => (
          <WeekBox key={idx}>{y}</WeekBox>
        ))}
      </View>
      <View>
        {month.map((w, wIdx) => (
          <Weekline key={wIdx}>
            {week.map((d, dIdx) => (
              <>
                {<Custombox onPress={() => _onPress(w, d)} key={dIdx} boxColor={monthdata[w * 7 + d]} />}
              </>
            ))}
          </Weekline>
        ))}
      </View>
    </View>
  )
};

export default CustomHeatmapChart;