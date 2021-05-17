import React, { useEffect } from 'react';
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

// 네비게이션 스택
import { createStackNavigator } from '@react-navigation/stack';

// 아이콘 사용하기
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';

const Tab = createBottomTabNavigator();
// stack => header를 구현하기 위해
const Stack = createStackNavigator();

// Tab바 이미지 부여
const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

// tab navi 구조화
function MainNavigator() {

};

const TabNavigation = () => {
  useEffect(() => {
    console.log('here')
    console.log(Tab)
    return () => {

    }
  }, [])
  return (
    <Tab.Navigator
      initialRouteName="Splash"
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: theme.colors.first,
        style: { height: 56, justifyContent: 'center', alignItems: 'center' },
        labelStyle: { fontSize: 12 },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
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
        }}
      />
      <Tab.Screen
        name="Splash"
        component={Splash}
        options={{
          tabBarButton: () => null,
        }}
      />
      {/* <Tab.Screen
        name="Daily"
        component={DailyPage}
        options={{
          tabBarButton: () => null,
        }}
      /> */}
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
