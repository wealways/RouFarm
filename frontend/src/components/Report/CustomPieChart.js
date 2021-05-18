import React,{useState,useContext,useEffect} from 'react';
import { StyleSheet, View,Text,useWindowDimensions } from "react-native";
import { VictoryPie, VictoryLegend,VictoryLabel } from "victory-native";
import Svg from 'react-native-svg';

import HeatmapContext from '@/contexts/Report/Heatmap';


const CustomPieChart = ({date,res}) => {
  const height = useWindowDimensions().height;
  const {heatmap,pieClickDispatch} = useContext(HeatmapContext);
  const [myData,setMyData] = useState([])
  const HashTagData = [
    { x: "운동", y: 0 },
    { x: "지식", y: 0 },
    { x: "자기개발", y: 0 },
    { x: "기타", y: 0 },
  ];

  useEffect(()=>{
    if(res[heatmap.date]!==undefined){
      console.log('파이차트')
      const temp = res[heatmap.date]['해쉬태그별']
      Object.keys(temp)
      .forEach(i=>{
        temp[i].forEach(j=>{
          if(i==='운동') HashTagData[0]['y']+=j['cnt']
          else if(i==='지식') HashTagData[1]['y']+=j['cnt']
          else if(i==='자기개발') HashTagData[2]['y']+=j['cnt']
          else HashTagData[3]['y']+=j['cnt']
  
        })
      })
  
      const myData = HashTagData.map((val)=>{
        return {x:val['x'],y:val['y']}
      })
      setMyData(myData)
    }
  },[heatmap.date])
  
  
  
  let month
  if(heatmap.date===''){
    month = parseInt(date[0].split('-')[1])+'월'
  }else{
    month = parseInt(heatmap.date.split('-')[1])+'월'
  }
  const width = useWindowDimensions().width;

  return (
    <View style={{marginLeft:-25,marginTop:-25,height:height/5*2}}>
      <Svg>
        <VictoryLegend
          x = {60}
          y = {10}
          gutter={30}
          orientation="horizontal"
          // style={{ border: { stroke: "black" } }}
          // colorScale={["#6f95aa", "#0c985e","#dce8ef","#687396" ]}
          colorScale={["#DE9E9B", "#7EC07A","#86C5C9","#E75B46" ]}
          data={[
            { name: "운동" }, { name: "지식" },{ name: "자기개발" }, { name: "기타" }
          ]}
        />
        <VictoryPie 
          innerRadius={50}
          // colorScale={["#6f95aa", "#0c985e","#dce8ef","#687396" ]}
          colorScale={["#DE9E9B", "#7EC07A","#86C5C9","#E75B46" ]}
          animate={{
            duration: 1500,
            onLoad: { duration: 1000 }
          }}
          domainPadding={{ x: [0, 100] }}
          data={myData}
          height={350}
          style={{ labels: { fill: "black", fontSize: 0 }, data:{opacity:0.8}}}
          labelRadius={80}
          // labels={({ datum }) => ``}
          events={[{
            target: "data",
            eventHandlers: {
              onPressIn: () => {
                return [
                  {
                    target: "data",
                    mutation: ({ style }) => {
                      return  { style: { opacity: 0.6 } };
                    }
                  }
                ];
              },
              onPressOut: () => {
                return [
                  {
                    target:"data",
                    mutation: ({style}) => {
                      return null
                    }
                  }, {
                    target: "labels",
                    mutation: ({ text }) => {
                      pieClickDispatch(text)
                      return 
                    }
                  }
                ]
              }
            }
          }]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={205} y={175}
          text={month}
        />
      </Svg>
    </View>
  )
}

export default CustomPieChart;