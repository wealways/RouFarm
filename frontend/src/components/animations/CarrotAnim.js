import React from 'react';
import LottieView from 'lottie-react-native';

const CarrotAnim = ({ style }) => {
  return (
    <LottieView
      style={style}
      source={require('../../assets/anmations/carrot.json')}
      autoPlay
      loop
    />
  );
};

export default CarrotAnim;
