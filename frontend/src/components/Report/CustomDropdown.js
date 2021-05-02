import React,{useState,useContext} from 'react';
import {View,Text,TouchableOpacity} from 'react-native'

import {Picker} from '@react-native-picker/picker';

import HeatmapContext from '@/contexts/Heatmap';

const CustomDropdown = () => {
  const {heatmap,dateDispatch} = useContext(HeatmapContext);
  return (
    <Picker
      style={{height:50,width:150}}
      selectedValue={heatmap.date}
      onValueChange={(itemValue, itemIndex) =>
        dateDispatch(itemValue)
      }
    >
      <Picker.Item label="2021-05" value="2021-05" />
      <Picker.Item label="2021-04" value="2021-04" />
      <Picker.Item label="2021-03" value="2021-03" />
    </Picker>
  )
}

export default CustomDropdown;