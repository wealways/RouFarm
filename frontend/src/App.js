import 'react-native-gesture-handler';
import React from 'react';

// 네비게이션
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 스타일
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './theme/index';

// 페이지
import { Home, Report, QR, CreateRoutine, Login, SelectMode, FriendList } from './screens/index';

// 리덕스
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createStackNavigator();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator component={Home}>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
            <Stack.Screen options={{ headerShown: false }} name="QR" component={QR} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CreateRoutine"
              component={CreateRoutine}
            />
            {/* screen test 용 */}
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SelectMode"
              component={SelectMode}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="FriendList"
              component={FriendList}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
