import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
// 네비게이션
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 스타일
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './theme/index';

// 페이지
import {
  Home,
  Report,
  QR,
  CreateRoutine,
  UpdateRoutine,
  Login,
  SelectMode,
  FriendList,
  Detail,
  Splash,
} from './screens/index';
import AlarmTest from './screens/AlarmTest';

// splash screen 
import SplashScreen from 'react-native-splash-screen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// navigation prop 없이 사용하기
import * as RootNavigation from './utils/RootNavigation';
import { navigationRef, isReadRef } from './utils/RootNavigation';

// 리덕스
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import { Value } from 'react-native-reanimated';
import TabNavigation from './navigators/Tab';

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createStackNavigator();

  // 스플래쉬 이미지 확인
  useEffect(async () => {
    console.log(RootNavigation)
    // 1. 시간 딜레이 설정
    setTimeout(() => {
      // 2. JWT 토큰 정보 확인
      AsyncStorage.getItem('JWT').then((JWT) => {
        // 토큰이 있다
        if (JWT !== null) {
          RootNavigation.reset({ routes: [{ name: "Home" }] });
        } else {
          // 토큰이 없다
          RootNavigation.reset({ routes: [{ name: "Login" }] });
        }
      })
    }, 1000);
    SplashScreen.hide();
    return () => {
      // 언마운트 체크
      isReadRef.current = false
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadRef.current = true;
          }}
        >
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <TabNavigation />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
