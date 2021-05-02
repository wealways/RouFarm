import React,{useState, useEffect, useContext} from 'react';
import {View, ScrollView,Text,TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import HeatmapContext from '@/contexts/Heatmap';



const Custombox = styled.TouchableOpacity`
  border-radius:5px;
  width:23px;
  height:23px;
  /* background-color:#ebedf0;ebedf0 */
  background-color:${({boxColor}) => boxColor >= 100 ? '#216e39': boxColor >= 50? '#30a14e' : boxColor > 0? '#9be9a8': boxColor ==0?'#ff0101': boxColor==-1 ?'#ebedf0':'#fff'};
  margin:1.8px;
`
const Weekline = styled.View`
  display:flex;
  flex-direction:row;

`

// 한달 데이터 -10은 아예 없는 날 / -1는 루틴 안만든 날 / 0은 루틴 하나도 안한 날
const INITIAL_MONTHDATA = [-10,-10,-10,-10,-10,-10,-10,-10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10]
const CustomHeatmapChart = () => {

  
  const [monthdata,setMonthdata] = useState(INITIAL_MONTHDATA);
  const {heatmap,rateDispatch} = useContext(HeatmapContext);
  

  useEffect(() => {
    const data = {
      '2021-05':[100, 100, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1,-1,-1,-1],
      '2021-04':[-1, 0, 10, 50, 100, 3, 0, 8, 6, -1, 0, 10, 100, 12, 99, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 75,0,0,0,0],
      '2021-03':[-1, -1, -1, 50, 100, 3, 0, 8, 6, -1, 0, 10, 100, 12, 99, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 75,0,0,0,0,1]
    }
    
    let dataInx = Object.keys(data).indexOf(heatmap.date)
    const Ddate = new Date(Object.keys(data)[dataInx])
    const day = Ddate.getDay() - 1
    const lastdate = new Date(Ddate.getFullYear(),Ddate.getMonth()+1,0).getDate();
    let sumV = 0
    let cnt = 0
    const update = INITIAL_MONTHDATA.map((d,i)=>{
      if(i<day){
        return d
      }else if(i<lastdate+day){
        const temp = Object.values(data)[dataInx][i-day]
        if(temp>=0){
          sumV += temp
          cnt += 1
        }
        return Object.values(data)[dataInx][i-day]
      }else{
        return d
      }
    })
    setMonthdata(update)
    rateDispatch(Math.round(sumV / cnt))
  },[heatmap.date]);

  // 한달 달성률
  const month = [0,1,2,3,4]
  const week = [0,1,2,3,4,5,6]

  const _onPress = (w,d) => {
    console.log(`${w}_${d}클릭\n`)
    console.log(w*7 +d)
    console.log('----')
  }
  
  return (
    <ScrollView>
      <Text>  월    화    수    목    금    토    일</Text>
      <View>
        {month.map((w,wIdx)=>(
          <Weekline key={wIdx}>
            {week.map((d,dIdx) =>(
              <Custombox onPress={() => _onPress(w,d)} key={dIdx} boxColor={monthdata[w*7+d]}/>
            ))}
          </Weekline>
        ))}
      </View>
    </ScrollView>
  )
};

export default CustomHeatmapChart;