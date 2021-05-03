import React,{useContext} from 'react';
import {Text} from 'react-native';

import PieContext from '@/contexts/Pie'

const CustomHeatmapRate = () => {
  const {Pie} = useContext(PieContext);

  return (
    <>
      <Text>선택: {Pie.click}</Text>
    </>
  )
}

export default CustomHeatmapRate;

