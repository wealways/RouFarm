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
  /* color:#216e39 */
  /* background-color:#ebedf0;ebedf0 */
  background-color:${({ boxColor }) => boxColor >= 100 ? '#216e39' : boxColor >= 50 ? '#30a14e' : boxColor > 0 ? '#9be9a8' : boxColor == 0 ? '#ff0101' : boxColor == -1 ? '#ebedf0' : '#fff'};
  background-color:${({ boxColor }) => boxColor >= 100 ? '#05D962' : boxColor >= 50 ? '#80C27C' : boxColor > 0 ? '#B8D980' : boxColor == 0 ? '#E0DB87' : boxColor == -1 ? '#e2e0d8' : '#fefdfa'};
  margin:2px;
`
const Weekline = styled.View`
  display:flex;
  flex-direction:row;

`



// 한달 데이터 -10은 아예 없는 날 / -1는 루틴 안만든 날 / 0은 루틴 하나도 안한 날
const INITIAL_MONTHDATA = [-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10]
const CustomHeatmapChart = ({navigation,res,token}) => {
  
  const [monthdata,setMonthdata] = useState(INITIAL_MONTHDATA);
  const {heatmap,rateDispatch} = useContext(HeatmapContext);
  const [tempD,setTempD] = useState(0);
  const yoil = ['월','화','수','목','금','토','일']
  
  const [isRender,setIsRender] = useState(false)
  useEffect(() => {
    // 한달 데이터  -1는 루틴 안만든 날 / 0~100은 루틴 하나도 안한 날 API
    // const data = {
    //   '2021-05':[100, 100, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1,-1,-1,-1],
    //   '2021-04':[-1, 0, 10, 50, 100, 3, 0, 8, 6, -1, 0, 10, 100, 12, 99, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 75,0,0,0,0],
    //   '2021-03':[-1, -1, -1, 50, 100, 3, 0, 8, 6, -1, 0, 10, 100, 12, 99, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 75,0,0,0,0,1]
    // }

    
    
    
    if(res[heatmap.date]!==undefined){
      const data = res[heatmap.date]['월간수확']
      const Ddate = new Date(heatmap.date)
      const day = Ddate.getDay() - 1
      setTempD(day)
      const lastdate = new Date(Ddate.getFullYear(), Ddate.getMonth() + 1, 0).getDate();
      let sumV = 0
      let cnt = 0
      const update = INITIAL_MONTHDATA.map((d, i) => {
        if (i < day) {
          return d
        }else if(i<lastdate+day){
          const temp = data[i-day]
          if(temp>=0){
            sumV += temp
            cnt += 1
          }
          return data[i-day]
        }else{
          return d
        }
      })
      setMonthdata(update)
      rateDispatch(Math.round(sumV / cnt))
      setIsRender(true)
    }
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
      // navigation.navigate('Hide',
      //   { screen: 'Daily', params: { date: date } });
      navigation.navigate('Daily', { date: date,token: token })
      console.log('here', date)
    }
  };


  return (
    <View>
      <View style={{flexDirection:'row'}}>
        {yoil.map((y,yIdx)=>(
          <WeekBox key={yIdx}>{y}</WeekBox>
        ))}
      </View>
      <View>
        {month.map((w, wIdx) => (
          <Weekline key={wIdx}>
            {week.map((d, dIdx) => (
              <View key={dIdx}>
                {monthdata[w*7+d]!==-1 && 
                  <Custombox key={dIdx} onPress={() => _onPress(w,d)} boxColor={monthdata[w*7+d]}/>
                }
                {/* 리포트없는날은 클릭 안되게 */}
                {monthdata[w * 7 + d] === -1 &&
                  <Custombox disabled={true} key={dIdx} onPress={() => _onPress(w, d)} boxColor={monthdata[w * 7 + d]} />
                }
              </View>
            ))}
          </Weekline>
        ))}
      </View>
    </View>
  )
};

export default CustomHeatmapChart;