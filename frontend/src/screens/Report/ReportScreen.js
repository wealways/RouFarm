import React, { useState,useEffect,useContext } from 'react';
import { 
  Text, 
  View, 
  useWindowDimensions,
  ScrollView,

} from 'react-native';

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
  ChartView
} from './Report.styles';

// components
import CustomHeatmapChart from '@/components/Report/CustomHeatmapChart';
import CustomHeatmapRate from '@/components/Report/CustomHeatmapRate';
import FailView from '@/components/Report/Fail';
import CustomBarChart from '@/components/Report/CustomBarChart';
import CustomPieChart from '@/components/Report/CustomPieChart';
import CustomDropdown from '@/components/Report/CustomDropdown';

import {HeatmapProvider} from '@/contexts/Heatmap'

function ReportScreen() {

  const width = useWindowDimensions().width;
  
  // =========================  실패리스트
  const [fails,setFails] = useState({});

  useEffect(async ()=>{
    const date = {
      1:{
        date:'2020.04.19',
        content:[
          { id: 1, routine: '코딩 테스트 문제 풀기', checked: false, tag:'자기개발' },
          { id: 2, routine: '헬스장 가기', checked: false, tag:'건강' },
          { id: 3, routine: '명상하기', checked: false, tag:'일상' },
        ]
      }
    };
    await setFails(date)
  },[]);

  
  return (
    <Wrapper>
      <ScrollView>
        <TitleText> Report Page</TitleText>
        {/* section 1 - 월간 수확 */}
        <Contents>
          <HeatmapProvider>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <SubtitleText>월간 수확</SubtitleText> 
              <CustomDropdown />
            </View>
            <View>
              <Card width={width}>
                <MonthChartView>
                  <CustomHeatmapChart/>
                </MonthChartView>
                <MonthTextView>
                  <CustomHeatmapRate/>
                </MonthTextView>
              </Card>
            </View>
          </HeatmapProvider>
        </Contents>

        {/* section 2 - 실패 리스트 */}
        <Contents>
          <SubtitleText>실패 리스트</SubtitleText>
          <Card width={width}>
            {Object.values(fails)
              .map((day)=>(
                <View key={day.date}>
                  <Text></Text>
                  <Text>{day.date}</Text>
                  <FailView contents={day.content} />
                </View>
              ))
            }
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
              <CustomPieChart 

              />
            </Card>
          </View>
        </Contents>
      </ScrollView>
    </Wrapper>
  );
}


export default ReportScreen;
