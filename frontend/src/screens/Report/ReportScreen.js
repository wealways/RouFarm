import React, { useState, useEffect, useContext,componentDidMount  } from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  StyleSheet
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
} from './Report.styles';
import LinearGradient from 'react-native-linear-gradient'

import Icon from 'react-native-vector-icons/FontAwesome';

// components
import CustomHeatmapChart from '@/components/Report/CustomHeatmapChart';
import CustomHeatmapRate from '@/components/Report/CustomHeatmapRate';
import FailView from '@/components/Report/CustomFailList';
import CustomBarChart from '@/components/Report/CustomBarChart';
import CustomPieChart from '@/components/Report/CustomPieChart';
import CustomPieList from '@/components/Report/CustomPieList';
import CustomDropdown from '@/components/Report/CustomDropdown';

//Context API
import { HeatmapProvider } from '@/contexts/Report/Heatmap';
import jwtContext from '@/contexts/jwt';
// import HeatmapContext from '@/contexts/Report/Heatmap';

//api
import { instance } from '@/api';



function ReportScreen({navigation}) {

  const [res,setRes] = useState('')
  const [loading, setLoading] = useState(true);
  const [monthRes,setMonthRes] = useState({});
  const [weekRes,setWeekRes] = useState({});
  const [monthDate,setMonthDate] = useState(['2021-05'])
  const [weekDate,setweekDate] = useState(['2021-05-w3'])

  // 월간
  // const date = ['2021-05', '2021-04', '2021-03']
  // // 주간
  // const weekDate = ['2021-05-w3', '2021-05-w2', '2021-05-w1']
  
  //jwt
  const {JWT} = useContext(jwtContext);
  console.log('JWT',JWT.jwt)
  
  //데이터 가져오기
  useEffect(()=>{
    instance.get(`report/monthAPI/`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ODYiLCJpYXQiOjE2MjA5NzA0MDcsImV4cCI6MTYyMzU2MjQwN30.CtvAR1QeW4pR_NbF8JU8_YDqrw5aWZAJJ87vQ5l6dgLwImMIestqlFlKWwSKHC4hYhbfX5CUkKpAHcs5-1XwJQ',
      },
    }).then(res=>{

      // month
      console.log(res.data)
      setMonthDate(Object.keys(res.data))
      setMonthRes(res.data)

      instance.get(`report/weekAPI/`,{
        headers: {
          Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ODYiLCJpYXQiOjE2MjA5NzA0MDcsImV4cCI6MTYyMzU2MjQwN30.CtvAR1QeW4pR_NbF8JU8_YDqrw5aWZAJJ87vQ5l6dgLwImMIestqlFlKWwSKHC4hYhbfX5CUkKpAHcs5-1XwJQ',
        },
      }).then(res=>{
        console.log(res.data)
        setWeekRes(res.data)
        setLoading(false);
      }).catch(e=>{
        console.log('week',e)
      })
    }).catch(e=>{
      console.log('month',e)
    })
  },[])

  


  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const TopTab = ({
    tabs: ['월간 리포트', '주간 리포트'],
    lineColor: '#000066',
    noSelectedStyled: { color: '#525252', fontSize: 14 },
    selectedStyle: { color: 'black', fontWeight: 'bold', fontSize: 14 },
    tabStyle: { paddingTop: 12, paddingBottom: 5, marginRight: 10 }
  })

  const [showIndex, setShowIndex] = useState(0);
  

  useEffect(() => {
    // setLoading(true);
  })

  

  return (
    
    <LinearGradient
      // colors={['#dce8ef', '#fff']}
      colors={['#FFFAEC', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    > 
    {loading===false && 
      <HeatmapProvider>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* <TitleText> Report Page</TitleText> */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {TopTab.tabs.map((d, idx) => {
              return (
                <View
                  key={idx}
                  onTouchStart={() => {
                    if (showIndex !== idx) {
                      setLoading(false);
                      setShowIndex(idx);
                    }
                  }}
                  style={{
                    borderBottomWidth: showIndex === idx ? 1 : 0,
                    borderBottomColor: TopTab.lineColor,
                    width: width / 2,
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={[
                      showIndex === idx ? TopTab.selectedStyle : TopTab.noSelectedStyled,
                      TopTab.tabStyle
                    ]}
                  >
                    {d}
                  </Text>
                </View>
              )
            })}
          </View>
          {showIndex === 0 &&
            <>
              {/* section 1 - 월간 수확 */}
              <Contents>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <CustomDropdown date={monthDate} flag={'month'} />
                  <Icon name="caret-down" size={15} color="#000" style={{ marginRight: 6 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SubtitleText>월간 수확</SubtitleText>
                </View>
                <View>
                  <Card width={width}>
                    <MonthChartView>
                      <CustomHeatmapChart navigation={navigation} res={monthRes}/>
                    </MonthChartView>
                    <MonthTextView>
                      <CustomHeatmapRate />
                    </MonthTextView>
                  </Card>
                </View>
              </Contents>
              {/* section 4 - 해쉬태그 별 달성률 */}
              <Contents>
                <SubtitleText>해쉬태그 별 루틴 개수</SubtitleText>
                <View>
                  <Card width={width}>
                    <CustomPieChart date={monthDate}  res={monthRes}/>
                  </Card>
                  <Card width={width}>
                    <CustomPieList />
                  </Card>
                </View>
              </Contents>
            </>
          }
          {showIndex === 1 &&
            <>
              {/* section 2 - 실패 리스트 */}
              <Contents>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <CustomDropdown date={weekDate} flag={'week'} />
                  <Icon name="caret-down" size={15} color="#000" style={{ marginRight: 6 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 330 }}>
                  <SubtitleText>실패리스트</SubtitleText>
                </View>
                <Card width={width}>
                  <FailView />
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
            </>
          }


        </ScrollView>
      </HeatmapProvider>
    }
    {loading===true &&
      <Text>로딩중입니다...</Text>
    }
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ReportScreen;
