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
  Setting,
  QRList,
  Test,
} from '../screens/index';

// 네비게이션 스택
import { createStackNavigator } from '@react-navigation/stack';

// 아이콘 사용하기
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// 로딩 - 메세지 공유
import commonLoading from '../components/common/commonLoading';


const HomeStack = createStackNavigator();
// tab navi
const Tab = createBottomTabNavigator();

// route 이름 가져오기
function getHeaderTitle(route) {
  // console.log(route, 'route정보');
  // console.log(route.params.date, 'route정보');
  // 날짜가 있으면 날짜를 반환하고 없으면 하루라는 정보 보여주기
  const routeName = 'Daily';
  // 확인
  // console.log(routeName, 'routeName');
  // console.log(route, 'routeName');
  return routeName;
}

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

// stack => header를 구현하기 위해
const Stack = createStackNavigator();

// Homestack
function HomeTabs() {
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
      {/* report 화면 */}
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: '통계',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'file-chart' }),
        }}
      />
      {/* QR화면 - 라벨 숨기기 */}
      <Tab.Screen
        name="QR"
        component={QR}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: (props) => TabIcon({ ...props, name: 'qrcode-scan', size: 45 }),
        }}
      />
      {/* 루틴 자랑 */}
      <Tab.Screen
        name="Share"
        component={commonLoading}
        options={{
          tabBarLabel: '루틴 자랑',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'message-image-outline' }),
        }}
      />
      {/* <Tab.Screen
        name="SelectMode"
        component={SelectMode}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'cog' }),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: (props) => TabIcon({ ...props, name: 'cog' }),
        }}
      />
    </Tab.Navigator>
  );
}

// Hidestack
// function HideTabs() {
//   return (
//     <Tab.Navigator>
//       {/* 로그인 */}
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           // tabBarButton: () => null,
//         }}
//       />
//       {/* splash */}
//       <Stack.Screen
//         name="Splash"
//         component={Splash}
//         options={{
//           // tabBarButton: () => null,
//         }}
//       />
//       {/* report detail */}
//       <Stack.Screen
//         name="Daily"
//         component={Detail}
//         options={{
//           // tabBarButton: () => null,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

const TabNavigation = () => {
  useEffect(() => {
    return () => { };
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      {/* 하단 탭에 안 보이는 부분 */}
      <Stack.Screen
        name="Daily"
        component={Detail}
        options={({ route }) => ({
          // header title
          headerTitle: getHeaderTitle(route),
          // headerStyle: {backgroundColor: '#dce8ef'},
          headerStyle: { backgroundColor: '#fffaec' },
        })}
      />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="QRList"
        component={QRList}
        options={{
          headerTitle: 'Setting',
          // headerStyle: {backgroundColor: '#fffaec'},
          headerStyle: { backgroundColor: '#2c5061' },
          headerTintColor: '#fff'
          // tabBarButton: () => null,
        }}
      />
      <Stack.Screen
        name="SelectMode"
        component={SelectMode}
        options={{
          headerTitle: 'Setting',
          // headerStyle: {backgroundColor: '#fffaec'},
          headerStyle: { backgroundColor: '#2c5061' },
          headerTintColor: '#fff'
          // tabBarButton: () => null,
        }}
      />
      {/* <Stack.Screen name="QRList" component={QRList} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};

export default TabNavigation;
