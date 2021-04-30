import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { DailyQuest, EmergencyQuest } from '@/components/Home';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DailyQuest" component={DailyQuest} />
      <Tab.Screen name="EmergencyQuest" component={EmergencyQuest} />
    </Tab.Navigator>
  );
}

export default MyTabs;
