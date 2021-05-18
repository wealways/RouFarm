import React, {useContext, useEffect, useState} from "react";
import { StyleSheet, View, Dimensions,Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryLegend,VictoryGroup,VictoryLine } from "victory-native";
import HeatmapContext from '@/contexts/Report/Heatmap';

// const MeanData = [
//   {x: "Mon", y: 59},
//   {x: "Tue", y: 70},
//   {x: "Wen", y: 69},
//   {x: "Thu", y: 100},
//   {x: "Fri", y: 30},
//   {x: "Sat", y: 100},
//   {x: "Sun", y: 100}
// ]

// const NowData = [
//   {x: "Mon", y: 69},
//   {x: "Tue", y: 20},
//   {x: "Wen", y: 100},
//   {x: "Thu", y: 100},
//   {x: "Fri", y: 45},
//   {x: "Sat", y: 100},
//   {x: "Sun", y: 70}
// ]

const CustomBarChart = ({res}) => {

  const {heatmap} = useContext(HeatmapContext)
  const [MeanData,setMeanData] = useState([])
  const [NowData,setNowData] = useState([])
  
  useEffect(()=>{
    setMeanData(res[heatmap.weekDate]['요일별평균']['전체평균'])
    setNowData(res[heatmap.weekDate]['요일별평균']['평균'])
  },[heatmap.weekDate])

  const width = Dimensions.get("window").width;
  const week = `${parseInt(heatmap.weekDate.split('-')[1])}월 ${heatmap.weekDate.split('-w')[1]}주차`

  return (
    <View style={styles.container}>
      <VictoryChart 
        width={width-20}
        domainPadding={8}
        domain={{ y: [0, 100] }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        style={{
          background: { fill: "#fff" }
        }}
      >
        <VictoryLegend 
          x = {180}
          orientation="horizontal"
          gutter={20}
          // colorScale={[ "#6f95aa", "#ff844b" ]}
          colorScale={[ "#86C5C9", "#E75B46" ]}
          data={[
            { name: "평균" }, { name: week }
          ]}
        />
        <VictoryGroup
          // offset={10}
        >
          <VictoryLine
            style={{
              // data: { stroke: "#6f95aa" },
              data: { stroke: "#86C5C9" },
              parent: { border: "2px solid #ccc",borderRadius:10}
            }}
            // interpolation="basis"
            data={MeanData}
            // labels={({ datum }) => datum.y}
          />
          {/* <VictoryBar
            categories={{
              x: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", 'Sun']
            }}
            data={MeanData}
            style={{
              data: { fill: "#6f95aa", fillOpacity: 0.6, }
            }}
            barRatio={1}
            barWidth={10}
          /> */}
          <VictoryBar
            categories={{
              x: ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", 'Sun']
            }}
            data={NowData}
            style={{
              // data: { fill: "#ff844b", fillOpacity: 0.6 }
              data: { fill: "#E75B46", fillOpacity: 0.6 }
            }}
            barRatio={1}
            barWidth={15}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5fcff"
    backgroundColor:'#fefdfa'
  }
});

export default CustomBarChart;