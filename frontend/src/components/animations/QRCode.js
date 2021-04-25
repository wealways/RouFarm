import React from 'react';
import LottieView from 'lottie-react-native';

const QRCode = () => {
  return <LottieView source={require('../../assets/anmations/qrcode.json')} autoPlay loop />;
};

export default QRCode;
