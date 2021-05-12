import ReactNativeAN from 'react-native-alarm-notification';
import { yoilReverse, dayOfMonth } from '@/utils/parsedate';

const alarmNotifData = {
  fire_date: ReactNativeAN.parseDate(new Date(Date.now())),
  vibrate: true,
  play_sound: true,
  schedule_type: 'once',
  channel: 'wakeup',
  volume: 0.9,
  loop_sound: true,
  has_button: true,
};

const repeatAlarmNotifData = {
  fire_date: ReactNativeAN.parseDate(new Date(Date.now())),
  vibrate: true,
  play_sound: true,
  schedule_type: 'repeat',
  channel: 'wakeup',
  volume: 0.9,
  loop_sound: true,
  has_button: true,
  repeat_interval: 'weekly',
  interval_value: 1, // repeat after 5 minutes
};

const notifData = {
  fire_date: ReactNativeAN.parseDate(new Date(Date.now())),
  vibrate: true,
  schedule_type: 'once',
  channel: 'wakeup',
};

const repeatNotifData = {
  fire_date: ReactNativeAN.parseDate(new Date(Date.now())),
  vibrate: true,
  schedule_type: 'repeat',
  channel: 'wakeup',
};

const setNofication = async (props) => {
  // 반복 O
  if (props.schedule_type === 'repeat') {
    const details = {
      ...repeatNotifData,
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
      ...notifData,
      ...props,
    };
    try {
      return await ReactNativeAN.scheduleAlarm(details);
    } catch (e) {
      console.log(e);
    }
  }
};

const setAlarm = async (props) => {
  // 반복 O
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

const viewAlarms = async () => {
  const list = await ReactNativeAN.getScheduledAlarms();
  console.log(list);
};

const deleteAlarm = async (alarmId) => {
  console.log(`delete alarm: ${alarmId}`);
  await ReactNativeAN.deleteAlarm(alarmId);
};

// QR 발동 !
const stopAlarmSound = () => {
  ReactNativeAN.stopAlarmSound();
};

const makeNotifi = async (startDate, repeatYoilList, questName, startTime) => {
  if (repeatYoilList.length === 0) {
    const alarmId = await setNofication({
      fire_date: startDate + ' ' + startTime,
      title: questName,
      message: questName,
    });
    return [alarmId.id];
  } else if (repeatYoilList.length > 0) {
    const alarmIdList = await Promise.all(
      repeatYoilList.map((value) => {
        const alarmId = setNofication({
          fire_date: makeRepeatDate(startDate, value) + ' ' + startTime,
          title: questName,
          message: questName,
          schedule_type: 'repeat',
        });
        return alarmId;
      }),
    );
    return alarmIdList.map((v) => v.id);
  }
};

// 알람 생성
const makeAlarm = async (startDate, repeatYoilList, questName, alarmTime) => {
  // 년.월.일(요일)
  // 알람이 있을때 -> 반복 유/무에 따라 결과가 달라짐
  if (repeatYoilList.length === 0) {
    const alarmId = await setAlarm({
      fire_date: startDate + ' ' + alarmTime,
      title: questName,
      message: questName,
    });
    return [alarmId.id];
  } else if (repeatYoilList.length > 0) {
    const alarmIdList = await Promise.all(
      repeatYoilList.map((value) => {
        const alarmId = setAlarm({
          fire_date: makeRepeatDate(startDate, value) + ' ' + alarmTime,
          title: questName,
          message: questName,
          schedule_type: 'repeat',
        });
        return alarmId;
      }),
    );
    return alarmIdList.map((v) => v.id);
  }
};

const makeRepeatDate = (startDate, repeatYoil) => {
  let [date, month, year] = startDate.split('-');
  let yoil = new Date(year, month * 1 - 1, date).getDay();

  let gap = yoilReverse[repeatYoil] - yoil;
  let tempDate = parseInt(date);
  let tempMonth = parseInt(month);
  let tempYear = parseInt(year);

  // 갭이 0보다 작으면 현재요일(숫자)이 반복요일(숫자)을 지났다는 의미이므로 --> 현재요일(숫자) + gap + 7
  // 현재 요일보다 반복해야하는 요일 더 뒤면 현재요일(숫자) + gap
  gap <= 0 ? (tempDate += gap + 7) : (tempDate += gap);
  if (dayOfMonth[month] < tempDate) {
    tempDate -= dayOfMonth[month];
    if (month === 12) {
      tempMonth = 1;
      tempYear += 1;
    } else tempMonth++;
  }

  return tempDate.toString() + '-' + tempMonth.toString() + '-' + tempYear.toString();
};

export {
  setNofication,
  setAlarm,
  viewAlarms,
  deleteAlarm,
  stopAlarmSound,
  makeNotifi,
  makeAlarm,
  makeRepeatDate,
};
