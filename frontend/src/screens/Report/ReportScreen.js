import React, { useState, useEffect, useContext  } from 'react';
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
import CustomNoData from '@/components/Report/CustomNoData';
import CustomHeatmapChart from '@/components/Report/CustomHeatmapChart';
import CustomHeatmapRate from '@/components/Report/CustomHeatmapRate';
import FailView from '@/components/Report/CustomFailList';
import CustomBarChart from '@/components/Report/CustomBarChart';
import CustomPieChart from '@/components/Report/CustomPieChart';
import CustomPieList from '@/components/Report/CustomPieList';
import CustomDropdown from '@/components/Report/CustomDropdown';
import Loading from '@/components/Report/Loading';

//Context API
import { HeatmapProvider } from '@/contexts/Report/Heatmap';
import jwtContext from '@/contexts/jwt';
// import HeatmapContext from '@/contexts/Report/Heatmap';

//api
import { instance } from '@/api';



function ReportScreen({navigation}) {
  const [res,setRes] = useState('')
  const [loading, setLoading] = useState(true);
  // 1 모든데이터 렌더링하겠다. 0 0개데이터렌더링하겠다. -1 로딩중이다.
  const [isRender,setIsRender] = useState(-1);
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
  
  //데이터 가져오기
  useEffect(()=>{
    instance.get(`report/monthAPI/`, {
      headers: {
        Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ODYiLCJpYXQiOjE2MjA5NzA0MDcsImV4cCI6MTYyMzU2MjQwN30.CtvAR1QeW4pR_NbF8JU8_YDqrw5aWZAJJ87vQ5l6dgLwImMIestqlFlKWwSKHC4hYhbfX5CUkKpAHcs5-1XwJQ',
        // Authorization: JWT.jwt,
      },
    }).then(res=>{
      let tempres = {}
      // month
      let tempdate = res.data.map((data,idx)=>{
        tempres = {...tempres,...data}
        return Object.keys(data)[0]
      })
      
      if(tempdate.length===0){
        setIsRender(0)
      }
      setMonthDate(tempdate)
      setMonthRes(tempres)
      instance.get(`report/weekAPI/`,{
        headers: {
          Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ODYiLCJpYXQiOjE2MjA5NzA0MDcsImV4cCI6MTYyMzU2MjQwN30.CtvAR1QeW4pR_NbF8JU8_YDqrw5aWZAJJ87vQ5l6dgLwImMIestqlFlKWwSKHC4hYhbfX5CUkKpAHcs5-1XwJQ',
          // Authorization: JWT.jwt,
        },
      }).then(res=>{
        let tempres = {}
        // month
        let tempdate = res.data.map((data,idx)=>{
          tempres = {...tempres,...data}
          return Object.keys(data)[0]
        })
        setweekDate(tempdate)
        setWeekRes(tempres)
        if(tempdate.length!==0){
          setIsRender(1)
        }
        setLoading(false);
      }).catch(e=>{
        console.error('week',e)
      })
    }).catch(e=>{
      console.error('month',e)
    })
  },[])

  


  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const TopTab = ({
    tabs: ['월간 리포트', '주간 리포트'],
    lineColor: '#2c5061',
    noSelectedStyled: { color: '#525252', fontSize: 14 },
    selectedStyle: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    tabStyle: { paddingTop: 12, paddingBottom: 5, marginRight: 10 }
  })

  const [showIndex, setShowIndex] = useState(0);
  

  

  return (
    
    <LinearGradient
      // colors={['#dce8ef', '#fff']}
      colors={['#fffaec', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    > 
    {isRender===0 && loading===false && <CustomNoData />}
    {isRender===1 && loading===false &&
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
                    borderBottomWidth: showIndex === idx ? 0 : 1,
                    borderBottomColor: TopTab.lineColor,
                    backgroundColor:showIndex===idx ? '#2c5061': '#fffaec',
                    width: width / 2,
                    height: 45,
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
                  <CustomDropdown date={monthDate} weekDate={weekDate} flag={'month'} />
                  <Icon name="caret-down" size={15} color="#000" style={{ marginRight: 6 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SubtitleText>월간 수확   </SubtitleText>
                </View>
                <View>
                  <Card width={width}>
                    <MonthChartView>
                      <CustomHeatmapChart navigation={navigation} res={monthRes} token={JWT.jwt}/>
                    </MonthChartView>
                    <MonthTextView>
                      <CustomHeatmapRate />
                    </MonthTextView>
                  </Card>
                </View>
              </Contents>
              {/* section 4 - 해쉬태그 별 달성률 */}
              <Contents>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SubtitleText>해쉬태그 별 루틴 개수   </SubtitleText>
                </View>
                <View>
                  <Card width={width}>
                    <CustomPieChart date={monthDate} res={monthRes}/>
                  </Card>
                  <Card width={width}>
                    <CustomPieList res={monthRes} />
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
                  <SubtitleText>실패리스트   </SubtitleText>
                </View>
                <Card width={width}>
                  <FailView res={weekRes}/>
                </Card>
              </Contents>
              {/* section 3 - 요일 별 달성률 */}
              <Contents>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SubtitleText>요일별 달성률   </SubtitleText>
                </View>
                <View>
                  <Card width={width}>
                    <CustomBarChart res={weekRes}/>
                  </Card>
                </View>
              </Contents>
            </>
          }


        </ScrollView>
      </HeatmapProvider>
    }
    {loading===true && isRender===-1 &&
      <Loading />
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
