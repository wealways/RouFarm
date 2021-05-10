import ReactNativeAN from 'react-native-alarm-notification';

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

export const setNofication = async (props) => {
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

export const setAlarm = async (props) => {
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

export const viewAlarms = async () => {
  const list = await ReactNativeAN.getScheduledAlarms();
  // console.log(list);
};

export const deleteAlarm = async (alarmId) => {
  console.log(`delete alarm: ${alarmId}`);
  await ReactNativeAN.deleteAlarm(alarmId);
};
// QR 발동 !
export const stopAlarmSound = () => {
  ReactNativeAN.stopAlarmSound();
};
