import 'react-native-gesture-handler';
import { TouchableOpacity, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { CarrotAnim } from '@/components/animations';

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
// context
import { JwtProvider, JwtConsumer } from '@/contexts/jwt';

// 리덕스
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Value } from 'react-native-reanimated';
import TabNavigation from './navigators/Tab';

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();

  // jwt check
  const [jwt, setJwt] = useState('');

  // 스플래쉬 이미지 확인
  useEffect(async () => {
    // 1. 시간 딜레이 설정
    setTimeout(() => {
      // 2. JWT 토큰 정보 확인
      AsyncStorage.getItem('JWT').then((JWT) => {
        setJwt(JWT);
        // 토큰이 있다
        if (JWT !== null) {
          RootNavigation.reset({ routes: [{ name: 'Home' }] });
        } else {
          // 토큰이 없다
          RootNavigation.reset({ routes: [{ name: 'Login' }] });
        }
      });
    }, 1000);
    SplashScreen.hide();
    return () => {
      // 언마운트 체크
      isReadRef.current = false;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <JwtProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadRef.current = true;
          }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <TabNavigation />
        </NavigationContainer>
      </JwtProvider>
    </ThemeProvider>
  );
};
//   const [isLoading, setIsLoading] = useState(true);
//   const [jwt, setJwt] = useState('');

//   useEffect(() => {
//     AsyncStorage.getItem('JWT', (err, res) => {
//       setJwt(res);
//       setIsLoading(false);
//     });
//     console.log(jwt);
//   }, []);
//   if (isLoading)
//     return (
//       <View style={{ justifyContent: 'center', alignContent: 'center' }}>
//         <CarrotAnim style={{ position: 'absolute', width: 200, left: 20, top: 20 }} />
//         <CarrotAnim style={{ width: 500 }} />
//         <CarrotAnim style={{ position: 'absolute', width: 300, right: 20, bottom: 20 }} />
//       </View>
//     );
//   else {
//     return (
//       <ThemeProvider theme={theme}>
//         <Provider store={store}>
//           <JwtProvider>
//             <NavigationContainer>
//               <>
//                 <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//                 {/* 토큰이 없으면 Login페이지로 이동 */}
//                 <Stack.Navigator initialRouteName={jwt !== null ? 'Home' : 'Login'}>
//                   <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
//                   <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
//                   <Stack.Screen options={{ headerShown: false }} name="QR" component={QR} />
//                   <Stack.Screen
//                     options={{ headerShown: false }}
//                     name="AlarmTest"
//                     component={AlarmTest}
//                   />
//                   <Stack.Screen
//                     options={{ headerShown: false }}
//                     name="CreateRoutine"
//                     component={CreateRoutine}
//                   />
//                   <Stack.Screen
//                     options={{ headerShown: false }}
//                     name="UpdateRoutine"
//                     component={UpdateRoutine}
//                   />
//                   {/* screen test 용 */}
//                   <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
//                   <Stack.Screen
//                     options={{ headerShown: false }}
//                     name="SelectMode"
//                     component={SelectMode}
//                   />
//                   <Stack.Screen
//                     options={{ headerShown: false }}
//                     name="FriendList"
//                     component={FriendList}
//                   />
//                   {/* 리포트 디테일 페이지 */}
//                   <Stack.Screen
//                     options={{
//                       headerStyle: {
//                         backgroundColor: '#dce8ef',
//                       },
//                     }}
//                     name="Daily"
//                     component={Detail}
//                   />
//                 </Stack.Navigator>
//               </>
//             </NavigationContainer>
//           </JwtProvider>
//         </Provider>
//       </ThemeProvider>
//     );
//   }
// };

export default App;
