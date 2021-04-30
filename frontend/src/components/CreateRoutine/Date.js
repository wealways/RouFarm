import React, { useState } from 'react';
import { Text } from 'react-native';
import { SmallButton } from './styles';
import { deviceWidth } from '@/utils/devicesize';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

function Date() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTimeShow, setStartTimeShow] = useState(false);
  const [endTimeShow, setEndTimeShow] = useState(false);

  const yoil = {
    0: '일',
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
  };

  // 날짜 설정
  const handleConfirm = (element) => {
    setDate(
      element.getFullYear() +
        '.' +
        (element.getMonth() * 1 + 1).toString() +
        '.' +
        element.getDate() +
        '(' +
        yoil[element.getDay()] +
        ')',
    );
    console.log('A date has been picked: ', element);
    hideDatePicker();
  };

  // 시작시간 설정
  const handleStartConfirm = (element) => {
    const time =
      element.getHours() > 12
        ? 'PM ' + (element.getHours() % 12) + ':' + element.getMinutes()
        : 'AM ' + element.getHours() + ':' + element.getMinutes();
    console.log('A date has been picked: ', element);
    setStartTime(time);

    hideStartTimePicker();
  };

  // 종료시간 설정
  const handleEndConfirm = (element) => {
    const time =
      element.getHours() > 12
        ? 'PM ' + (element.getHours() % 12) + ':' + element.getMinutes()
        : 'AM ' + element.getHours() + ':' + element.getMinutes();
    console.log('A date has been picked: ', element);
    setEndTime(time);

    hideEndTimePicker();
  };
  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={startTimeShow}
        mode="time"
        // is24Hour={true}
        onConfirm={handleStartConfirm}
        onCancel={hideStartTimePicker}
      />
      <SmallButton onPress={showEndTimePicker}>
        <Text style={{ opacity: 0.5, fontSize: 12 }}>{!endTime ? '종료 시간' : endTime}</Text>
      </SmallButton>
      <DateTimePickerModal
        isVisible={endTimeShow}
        // is24Hour={true}
        mode="time"
        onConfirm={handleEndConfirm}
        onCancel={hideEndTimePicker}
      />
    </>
  );
}

export default Date;
