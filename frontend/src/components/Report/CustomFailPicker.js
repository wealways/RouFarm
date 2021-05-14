import React, { useState, useContext } from 'react';
import {TouchableOpacity,Text} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import FailListContext from '@/contexts/Report/FailList';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomFailPicker = () => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('오늘');
  const {failList,dateDispatch} = useContext(FailListContext);
  
  const handleConfirm = (element) => {
    let nowmonth = element.getMonth() + 1
    nowmonth = nowmonth >= 10 ? nowmonth : '0'+nowmonth;
    let nowday = element.getDate()
    nowday = nowday >= 10 ? nowday : '0'+nowday;
    console.log('hi')
    dateDispatch(
      element.getFullYear() +
        '-' +
        (nowmonth).toString() +
        '-' +
        nowday.toString()
    );
    hideDatePicker();
  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <TouchableOpacity onPress={showDatePicker} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Text style={{marginRight:30}}>{failList.date}</Text>
        <Icon name="caret-down" size={15} color="#000" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  )
};

export default CustomFailPicker;