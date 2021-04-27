import React,{useState} from 'react';
import {View, ScrollView} from 'react-native'
import HeatMap from 'react-native-heatmap-chart';

const CustomHeatmapChart = () => {
  const click = item => {
    console.log(`Value: ${item.value}`);
    console.log(`Index: ${item.index}`);
  };
  const [initialData,setData] = useState(
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  )
  const data = [0, 4, 6, 1, 7, 3, 0, 8, 6, 2, 0, 10, 20, 12, 0, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 23,0,0,0,0,0,0,0,0,0]
  // setData(data => {
  //   initialData = data
  // })
  return (
    <ScrollView>
      <HeatMap 
        values={data} 
        onBlockPress={click} 
        numberOfLines={5}
        blocksSize={22}
      />
    </ScrollView>
  )
};

export default CustomHeatmapChart;