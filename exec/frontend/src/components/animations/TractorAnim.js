import React from 'react';
import LottieView from 'lottie-react-native';

const TractorAnim = ({ style }) => {
  return (
    <LottieView style={style} source={require('@/assets/anmations/tractor.json')} autoPlay loop />
  );
};

export default TractorAnim;
