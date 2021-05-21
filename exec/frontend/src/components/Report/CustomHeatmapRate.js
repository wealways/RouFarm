import React,{useContext} from 'react';
import {Text} from 'react-native';

import HeatmapContext from '@/contexts/Report/Heatmap'

const CustomHeatmapRate = () => {
  const {heatmap} = useContext(HeatmapContext);
  const date = new Date(heatmap.date)
  return (
    <>
      <Text>{date.getMonth()+1}월 달성률</Text>
      <Text style={{fontSize:30, margin:5,fontWeight:"600"}}>{heatmap.rate} %</Text>
    </>
  )
}

export default CustomHeatmapRate;

