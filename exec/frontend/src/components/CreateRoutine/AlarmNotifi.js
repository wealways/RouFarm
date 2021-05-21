import ReactNativeAN from 'react-native-alarm-notification';
import { yoilReverse, dayOfMonth } from '@/utils/parsedate';

const viewAlarms = async () => {
  const list = await ReactNativeAN.getScheduledAlarms();
  console.log(list);
};

const deleteAlarm = async (alarmId) => {
  console.log(`delete alarm: ${alarmId}`);
  await ReactNativeAN.deleteAlarm(alarmId);
};

const stopAlarmSound = () => {
  ReactNativeAN.stopAlarmSound();
};

const QRAlarmNotifData = {
  vibrate: true,
  has_button: true,
  play_sound: true,
  schedule_type: 'repeat',
  channel: 'wakeup',
  volume: 0.9,
  loop_sound: true,
  repeat_interval: 'minutely',
  interval_value: 2, // repeat after 5 minutes
};

const setQRAlarm = async (props) => {
  // 반복 O
  console.log('알람: ', props);
  const details = {
    ...QRAlarmNotifData,
    ...props,
  };
  try {
    return await ReactNativeAN.scheduleAlarm(details);
  } catch (e) {
    console.log(e);
  }
};

// 알람 생성
const makeQRAlarm = async (startDate, repeatYoilList, questName, alarmTime) => {
  if (repeatYoilList.length === 0) {
    const alarmId = await setQRAlarm({
      fire_date: startDate + ' ' + alarmTime,
      title: questName,
      message: questName,
    });
    console.log(alarmId);
    return [alarmId.id];
  } else if (repeatYoilList.length > 0) {
    const alarmIdList = await Promise.all(
      repeatYoilList.map((value) => {
        const alarmId = setQRAlarm({
          fire_date: makeRepeatDate(startDate, value, alarmTime) + ' ' + alarmTime,
          title: questName,
          message: questName,
          schedule_type: 'repeat',
        });
        console.log(alarmId);
        return alarmId;
      }),
    );
    return alarmIdList.map((v) => v.id);
  }
};

const alarmNotifData = {
  vibrate: true,
  has_button: true,
  play_sound: true,
  schedule_type: 'once',
  channel: 'wakeup',
  volume: 0.9,
  loop_sound: true,
};

const repeatAlarmNotifData = {
  vibrate: true,
  has_button: true,
  play_sound: true,
  schedule_type: 'repeat',
  channel: 'wakeup',
  volume: 0.9,
  loop_sound: true,
  repeat_interval: 'weekly',
  interval_value: 1, // repeat after 5 minutes
};

const setAlarm = async (props) => {
  // 반복 O
  console.log('알람: ', props);
  if (props.schedule_type === 'repeat') {
    const details = {
      ...repeatAlarmNotifData,
      ...props,
    };
    try {
      return await ReactNativeAN.scheduleAlarm(details);
    } catch (e) {
      console.log(e);
    }
  } else {
    // 반복 X
    const details = {
      ...alarmNotifData,
      ...props,
    };
    try {
      return await ReactNativeAN.scheduleAlarm(details);
    } catch (e) {
      console.log(e);
    }
  }
};

// 알람 생성
const makeAlarm = async (startDate, repeatYoilList, questName, alarmTime) => {
  if (repeatYoilList.length === 0) {
    const alarmId = await setAlarm({
      fire_date: startDate + ' ' + alarmTime,
      title: questName,
      message: questName,
    });
    console.log(alarmId);
    return [alarmId.id];
  } else if (repeatYoilList.length > 0) {
    const alarmIdList = await Promise.all(
      repeatYoilList.map((value) => {
        const alarmId = setAlarm({
          fire_date: makeRepeatDate(startDate, value, alarmTime) + ' ' + alarmTime,
          title: questName,
          message: questName,
          schedule_type: 'repeat',
        });
        console.log(alarmId);
        return alarmId;
      }),
    );
    return alarmIdList.map((v) => v.id);
  }
};

const makeRepeatDate = (startDate, repeatYoil, alarmTime) => {
  let [date, month, year] = startDate.split('-');
  let yoil = new Date(year, month * 1 - 1, date).getDay();

  let gap = yoilReverse[repeatYoil] - yoil;
  let tempDate = parseInt(date);
  let tempMonth = parseInt(month);
  let tempYear = parseInt(year);

  // 갭이 0보다 작으면 현재요일(숫자)이 반복요일(숫자)을 지났다는 의미이므로 --> 현재요일(숫자) + gap + 7
  // 현재 요일보다 반복해야하는 요일 더 뒤면 현재요일(숫자) + gap
  gap < 0 ? (tempDate += gap + 7) : (tempDate += gap);
  if (gap === 0) {
    let [hours1, minutes1, seconds1] = [...alarmTime.split(':')];
    let time = new Date().toTimeString().split(' ')[0];
    let [hours2, minutes2, seconds2] = [...time.split(':')];

    console.log(hours1, minutes1, seconds1);
    console.log(hours2, minutes2, seconds2);
    if (
      parseInt(hours2) > parseInt(hours1) ||
      (parseInt(hours2) === parseInt(hours1) && parseInt(minutes2) > parseInt(minutes1))
    ) {
      console.log('next week!', alarmTime);
      tempDate += 7;
    }
  }

  if (dayOfMonth[month] < tempDate) {
    tempDate -= dayOfMonth[month];
    if (month === 12) {
      tempMonth = 1;
      tempYear += 1;
    } else tempMonth++;
  }

  return tempDate.toString() + '-' + tempMonth.toString() + '-' + tempYear.toString();
};

// const notifData = {
//   vibrate: false,
//   has_button: false,
//   schedule_type: 'once',
//   channel: 'wakeup',
// };

// const repeatNotifData = {
//   vibrate: false,
//   has_button: false,
//   schedule_type: 'repeat',
//   channel: 'wakeup',
// };

// const makeNotifi = async (startDate, repeatYoilList, questName, startTime) => {
//   if (repeatYoilList.length === 0) {
//     const alarmId = await setNofication({
//       fire_date: startDate + ' ' + startTime,
//       title: questName,
//       message: questName,
//     });
//     console.log(alarmId);
//     return [alarmId.id];
//   } else if (repeatYoilList.length > 0) {
//     const alarmIdList = await Promise.all(
//       repeatYoilList.map((value) => {
//         const alarmId = setNofication({
//           fire_date: makeRepeatDate(startDate, value, alarmTime) + ' ' + startTime,
//           title: questName,
//           message: questName,
//           schedule_type: 'repeat',
//         });
//         console.log(alarmId);
//         return alarmId;
//       }),
//     );
//     return alarmIdList.map((v) => v.id);
//   }
// };

// const setNofication = async (props) => {
//   // 반복 O
//   console.log('알림 :', props);
//   if (props.schedule_type === 'repeat') {
//     const details = {
//       ...repeatNotifData,
//       ...props,
//     };
//     try {
//       return await ReactNativeAN.scheduleAlarm(details);
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     // 반복 X
//     const details = {
//       ...notifData,
//       ...props,
//     };
//     try {
//       return await ReactNativeAN.scheduleAlarm(details);
//     } catch (e) {
//       console.log(e);
//     }
//   }
// };

export {
  setAlarm,
  viewAlarms,
  deleteAlarm,
  stopAlarmSound,
  makeAlarm,
  makeQRAlarm,
  makeRepeatDate,
  // makeNotifi,
  // setNofication,
};
