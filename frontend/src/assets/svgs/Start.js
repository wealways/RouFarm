import SvgUri from 'react-native-svg';

export function StartIcon(props) {
  return <SvgUri width="5" height="5" source={require('../images/flag.svg')} {...props}></SvgUri>;
}
