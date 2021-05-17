import SvgUri from 'react-native-svg';

export function AlarmIcon(props) {
  return <SvgUri width="5" height="5" source={require('../images/alarm.svg')} {...props}></SvgUri>;
}
