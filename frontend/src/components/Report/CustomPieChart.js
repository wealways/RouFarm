import React from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryPie, VictoryTooltip,VictoryGroup } from "victory-native";



const CustomPieChart = () => {

  const HashTagData = [
    { x: "건강", y: 35 },
    { x: "자기개발", y: 40 },
    { x: "일상", y: 55 },
    { x: "없음", y: 70 },
  ];

  return (
    <View style={{margin:-25}}>
      <VictoryPie
        colorScale={["#6f95aa", "#0c985e","#dce8ef","#687396" ]}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        domainPadding={{ x: [0, 100] }}
        data={HashTagData}
        style={{ labels: { fill: "black", fontSize: 18 }, data:{opacity:0.8}}}
        labelRadius={90}
      />
    </View>
  )
}

export default CustomPieChart;