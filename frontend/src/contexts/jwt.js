import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const jwtContext = createContext({
  JWT: { jwt: '' },
  dispatch: () => {},
});

const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState('JWT is Comming...');

  AsyncStorage.getItem('JWT', (err, res) => {
    console.log(res);
    setJwt(res);

    if (err) console.log(err);
  });

  const value = { JWT: { jwt }, dispatch: setJwt };
  return <jwtContext.Provider value={value}>{children}</jwtContext.Provider>;
};

const JwtConsumer = jwtContext.Consumer;

export { JwtProvider, JwtConsumer };

export default jwtContext;
