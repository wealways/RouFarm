import React,{useState,useContext,useEffect} from 'react';
import { StyleSheet, View,Text,useWindowDimensions } from "react-native";
import { VictoryPie, VictoryLegend,VictoryLabel } from "victory-native";
import Svg from 'react-native-svg';

import HeatmapContext from '@/contexts/Report/Heatmap';


const CustomPieChart = ({date}) => {
  const height = useWindowDimensions().height;
  const {heatmap,pieClickDispatch} = useContext(HeatmapContext);

  const HashTagData = [
    { x: "건강", y: 35 },
    { x: "자기개발", y: 40 },
    { x: "일상", y: 55 },
    { x: "없음", y: 70 },
  ];
  
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
          colorScale={["#6f95aa", "#0c985e","#dce8ef","#687396" ]}
          data={[
            { name: "건강" }, { name: "자기개발" },{ name: "일상" }, { name: "없음" }
          ]}
        />
        <VictoryPie 
          innerRadius={50}
          colorScale={["#6f95aa", "#0c985e","#dce8ef","#687396" ]}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          domainPadding={{ x: [0, 100] }}
          data={HashTagData}
          height={350}
          style={{ labels: { fill: "black", fontSize: 10 }, data:{opacity:0.8}}}
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