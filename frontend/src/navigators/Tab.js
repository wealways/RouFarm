import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
} from '../screens/index';

// 아이콘 사용하기
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 홈화면 안에서 Router 뚫기
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="CreateRoutine" component={CreateRoutine} />
      <HomeStack.Screen name="UpdateRoutine" component={UpdateRoutine} />
    </HomeStack.Navigator>
  );
}

// Tab바 이미지 부여
const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="환경설정"
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: theme.colors.first,
        style: { height: 56, justifyContent: 'center', alignItems: 'center' },
        labelStyle: { fontSize: 10 },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: '통계',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'file-chart' }),
        }}
      />
      {/* 라벨 숨기기 */}
      <Tab.Screen
        name="QR"
        component={QR}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: (props) => TabIcon({ ...props, name: 'qrcode-scan', size: 45 }),
        }}
      />
      <Tab.Screen
        name="Share"
        component={FriendList}
        options={{
          tabBarLabel: '루틴 자랑',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'message-image-outline' }),
        }}
      />
      {/* <Tab.Screen
        name="CreateRoutine"
        component={CreateRoutine}
        options={{
          tabBarLabel: '루틴 생성',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'playlist-plus' }),
          tabBarOptions: 
        }}
      /> */}
      {/* <Tab.Screen
        name="CreateRoutine"
        component={CreateRoutine}
        options={{
          tabBarLabel: '루틴 생성',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'playlist-plus' }),
        }}
      /> */}
      <Tab.Screen
        name="SelectMode"
        component={SelectMode}
        options={{
          tabBarLabel: '환경설정',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'cog' }),
        }}
      />
      {/* 탭에 보이지 않는 옵션 */}
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Splash"
        component={Splash}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Daily"
        component={Detail}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
