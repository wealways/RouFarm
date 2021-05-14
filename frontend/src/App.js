import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
// 네비게이션
import { NavigationContainer } from '@react-navigation/native';
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
  Detail
} from './screens/index';
import AlarmTest from './screens/AlarmTest';

// 리덕스
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';
import { Value } from 'react-native-reanimated';

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
            <Stack.Screen options={{ headerShown: false }} name="QR" component={QR} />
            <Stack.Screen options={{ headerShown: false }} name="AlarmTest" component={AlarmTest} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CreateRoutine"
              component={CreateRoutine}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="UpdateRoutine"
              component={UpdateRoutine}
            />
            {/* screen test 용 */}
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="SelectMode" component={SelectMode} />
            <Stack.Screen options={{ headerShown: false }} name="FriendList" component={FriendList} />
            {/* 리포트 디테일 페이지 */}
            <Stack.Screen options={{headerStyle:{
              backgroundColor:'#dce8ef'
            }}} name="Daily" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
