import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ScrollView, StatusBar, useColorScheme } from 'react-native';

import { ThemeProvider } from 'styled-components/native';
import theme from './theme/index';

import { Home, Report, QR } from '@/containers/index';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator component={Home}>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
          <Stack.Screen options={{ headerShown: false }} name="QR" component={QR} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
