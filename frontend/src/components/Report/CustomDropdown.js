import React,{useState} from 'react';
import {View,Text,TouchableOpacity} from 'react-native'

import {Picker} from '@react-native-picker/picker';

const CustomDropdown = (onHeatmapChange) => {
  const [selectedLanguage, setSelectedLanguage] = useState('2021-04');
  return (
    <Picker
      style={{height:50,width:150}}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }
    >
      <Picker.Item label="2021-04" value="2021-04" />
      <Picker.Item label="2021-03" value="2021-03" />
    </Picker>
  )
}

export default CustomDropdown;