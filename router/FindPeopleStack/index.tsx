import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FindPeopleScreen from '../../screens/FindPeopleScreen';
import SomebodyPageScreen from '../../screens/SomebodyPageScreen';
import SomebodyImageLocationScreen from '../../screens/SomebodyImageLocationScreen';
import { FindPeopleParamList } from './FindPeopleParams';

const Stack = createStackNavigator<FindPeopleParamList>();

export default function FindPeopleStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='FindPeopleScreen'>
      <Stack.Screen name="FindPeopleScreen" component={FindPeopleScreen} />
      <Stack.Screen name="SomebodyPage" component={SomebodyPageScreen} />
      <Stack.Screen name="SomebodyImageLocation" component={SomebodyImageLocationScreen} />
    </Stack.Navigator>
  );
}

