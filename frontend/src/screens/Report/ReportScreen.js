import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, useWindowDimensions, ScrollView } from 'react-native';

//styled
import styled from 'styled-components/native';
import {
  Wrapper,
  Contents,
  TitleText,
  SubtitleText,
  Card,
  MonthChartView,
  MonthTextView,
  FailListView,
  ChartView,
} from './Report.styles';

// components
import CustomHeatmapChart from '@/components/Report/CustomHeatmapChart';
import FailView from '@/components/Report/Fail';
import CustomBarChart from '@/components/Report/CustomBarChart';
import CustomPieChart from '@/components/Report/CustomPieChart';
import CustomDropdown from '@/components/Report/CustomDropdown';

function ReportScreen() {
  const width = useWindowDimensions().width;

  // ============  월간 수확 컴포넌트
  // 한달 데이터
  const [monthdata, setMonthdata] = useState([
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
  ]);
  // 전체 날짜
  const nowdate = new Date();
  const nowyear = nowdate.getFullYear();
  let nowmonth = nowdate.getMonth() + 1;
  nowmonth = nowmonth >= 10 ? nowmonth : '0' + nowmonth;
  const [date, setDate] = useState(`${nowyear}-${nowmonth}`);
  // 어떤 월?
  const [month, setMonth] = useState(1);

  useEffect(() => {
    const data = {
      '2021-04': [
        -1,
        0,
        10,
        50,
        100,
        3,
        0,
        8,
        6,
        -1,
        0,
        10,
        100,
        12,
        99,
        0,
        10,
        0,
        17,
        8,
        0,
        6,
        0,
        6,
        10,
        75,
        0,
        0,
        0,
        0,
      ],
      '2021-03': [
        -1,
        -1,
        -1,
        50,
        100,
        3,
        0,
        8,
        6,
        -1,
        0,
        10,
        100,
        12,
        99,
        0,
        10,
        0,
        17,
        8,
        0,
        6,
        0,
        6,
        10,
        75,
        0,
        0,
        0,
        0,
        1,
      ],
    };
    let dataInx = Object.keys(data).indexOf(date);
    const Ddate = new Date(Object.keys(data)[dataInx]);
    const day = Ddate.getDay() - 1;
    setMonth(Ddate.getMonth() + 1);
    const lastdate = new Date(Ddate.getFullYear(), Ddate.getMonth() + 1, 0).getDate();

    const update = monthdata.map((d, i) => {
      if (i < day) {
        return d;
      } else if (i < lastdate + day) {
        return Object.values(data)[dataInx][i - day];
      } else {
        return d;
      }
    });
    setMonthdata(update);
  }, []);

  // 한달 달성률
  const now = new Date();
  const MonthRate = Math.round(monthdata.reduce((a, b) => a + b, 0) / now.getDate(), 1);

  // =========================  실패리스트
  const [fails, setFails] = useState({});

  useEffect(async () => {
    const date = {
      1: {
        date: '2020.04.19',
        content: [
          { id: 1, routine: '코딩 테스트 문제 풀기', checked: false, tag: '자기개발' },
          { id: 2, routine: '헬스장 가기', checked: false, tag: '건강' },
          { id: 3, routine: '명상하기', checked: false, tag: '일상' },
        ],
      },
    };
    await setFails(date);
  }, []);

  return (
    <Wrapper>
      <ScrollView>
        <TitleText> Report Page</TitleText>
        {/* section 1 - 월간 수확 */}
        <Contents>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <SubtitleText>월간 수확</SubtitleText>
            <View>
              <CustomDropdown />
            </View>
          </View>
          <View>
            <Card width={width}>
              <MonthChartView>
                <CustomHeatmapChart Monthdata={monthdata} />
              </MonthChartView>
              <MonthTextView>
                <Text>{month}월 달성률</Text>
                <Text style={{ fontSize: 30, margin: 5, fontWeight: '600' }}>{MonthRate} %</Text>
              </MonthTextView>
            </Card>
          </View>
        </Contents>
        {/* section 2 - 실패 리스트 */}
        <Contents>
          <SubtitleText>실패 리스트</SubtitleText>
          <Card width={width}>
            {Object.values(fails).map((day) => (
              <View key={day.date}>
                <Text></Text>
                <Text>{day.date}</Text>
                <FailView contents={day.content} />
              </View>
            ))}
          </Card>
        </Contents>
        {/* section 3 - 요일 별 달성률 */}
        <Contents>
          <SubtitleText>요일 별 달성률</SubtitleText>
          <View>
            <Card width={width}>
              <CustomBarChart />
            </Card>
          </View>
        </Contents>
        {/* section 4 - 해쉬태그 별 달성률 */}
        <Contents>
          <SubtitleText>해쉬태그 별 달성률</SubtitleText>
          <View>
            <Card width={width}>
              <CustomPieChart />
            </Card>
          </View>
        </Contents>
      </ScrollView>
    </Wrapper>
  );
}

export default ReportScreen;
