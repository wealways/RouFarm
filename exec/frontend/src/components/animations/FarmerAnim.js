import React from 'react';
import LottieView from 'lottie-react-native';

const FarmerAnim = ({ style }) => {
  return (
    <LottieView style={style} source={require('@/assets/anmations/farmer.json')} autoPlay loop />
  );
};

export default FarmerAnim;
