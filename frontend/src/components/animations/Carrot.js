import React from 'react';
import LottieView from 'lottie-react-native';

const Carrot = ({ style }) => {
  return (
    <LottieView
      style={style}
      source={require('../../assets/anmations/carrot.json')}
      autoPlay
      loop
    />
  );
};

export default Carrot;
