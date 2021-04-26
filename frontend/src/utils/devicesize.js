import { Dimensions } from 'react-native';

// window는 상태바를 제거한 사이즈, screen은 상태바 무시 전체 사이즈
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export { deviceWidth, deviceHeight, screenWidth, screenHeight };
