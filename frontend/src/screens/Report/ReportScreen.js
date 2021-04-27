import React, { useState,useEffect } from 'react';
import { 
  Text, 
  View, 
  useWindowDimensions,
  ScrollView,

} from 'react-native';

import styled from 'styled-components/native';

import CustomHeatmapChart from '@/components/Report/CustomHeatmapChart'
import FailView from '@/components/Report/Fail'
import CustomBarChart from '@/components/Report/CustomBarChart'
import CustomPieChart from '@/components/Report/CustomPieChart'


const Wrapper = styled.View`
  flex:1;
  background:#dce8ef;

`;
const Contents = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  /* align-items: center; */
  margin: 10px;
`;
const TitleText = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.xxl}px;
  color: #000;
  margin:20px;
  text-align:center;
`
const SubtitleText = styled.Text`
  font-size:${({theme}) => theme.fontSizes.lg}px;
  color: #000;
  margin: 8px 0;
`
// const StyledText = styled.Text`
//   font-size: ${FontSize}px;
//   color: ${Color};
// `
const Card = styled.View`
  display:flex;
  flex-direction:row;
  padding: 16px;
  align-items:center;
  border-radius:8px;
  background: #fff;
  width: ${({width}) => width - 20}px;
  elevation: 12;
`;

// 월간 수확
const MonthChartView = styled.View`
  flex:4;
  background:#fff;
  border-radius:8px;
  padding: 8px;
`
const MonthTextView = styled.View`
  flex:2;
  margin-left:8px;
  align-items:center;
  justify-content:center;
`

// 실패 리스트
const FailListView = styled.View`
  background:#fff;
  elevation:12;
  border-radius:8px;
  padding: 16px;
  margin: 8px;
  flex:1;
`
// 요일별 달성률
const ChartView = styled.View`
  background:#fff;
  elevation:12;
  border-radius:8px;
  padding: 16px;
  margin: 8px;
  flex:1;
`

function ReportScreen() {

  const width = useWindowDimensions().width;
  const [rate,setRate] = useState(0);
  const [fails,setFails] = useState({});

  useEffect(async ()=>{
    const Fails = {
      1:{
        date:'2020.04.19',
        content:[
          { id: 1, routine: '코딩 테스트 문제 풀기', checked: false, tag:'자기개발' },
          { id: 2, routine: '헬스장 가기', checked: false, tag:'건강' },
          { id: 3, routine: '명상하기', checked: false, tag:'일상' },
        ]
      }
    };

    await setFails(Fails)
  },[]);

  return (
    <Wrapper>
      <ScrollView>
        <TitleText> Report Page</TitleText>
        {/* section 1 - 월간 수확 */}
        <Contents>
          <SubtitleText>월간 수확</SubtitleText>
          <View>
            <Card width={width}>
              <MonthChartView>
                <CustomHeatmapChart />
              </MonthChartView>
              <MonthTextView>
                <Text>달성률</Text>
                <Text>{rate} %</Text>
              </MonthTextView>
            </Card>
          </View>
        </Contents>
        {/* section 2 - 실패 리스트 */}
        <Contents>
          <SubtitleText>실패 리스트</SubtitleText>
          <View>
            <Card width={width}>
              <FailListView>
                {Object.values(fails)
                  .map((day)=>(
                    <View>
                      <Text>{day.date}</Text>
                      <FailView contents={day.content} />
                    </View>
                  ))
                }
              </FailListView>
            </Card>
          </View>
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
