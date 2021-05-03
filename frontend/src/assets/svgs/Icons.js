import SvgUri from 'react-native-svg';

export function kakaoSymbol(props) {
  return (
    <SvgUri width="5" height="5" source={require('../images/Kakao_symbol.svg')} {...props}>
    </SvgUri>
  );
}