import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './params';

import HomeScreen from '../../screens/HomeScreen';
import PostDetailsScreen from '../../screens/PostDetailsScreen';
import LocationScreen from '../../screens/LocationScreen';
import EditPostScreen from '../../screens/EditPostScreen';
import ImageSelectLocationScreen from '../../screens/ImageSelectLocationScreen';
import ChangeImageScreen from '../../screens/ChangeImageScreen';
import ReadyToPostScreen from '../../screens/ReadyToPostScreen';

const Stack = createNativeStackNavigator<HomeStackParams>();

export default function HomeStack () {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: '#F2994A' },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
          color: 'black',
        },
    }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="EditPost" component={EditPostScreen} />
      <Stack.Screen name="ImageSelectLocation" component={ImageSelectLocationScreen} />
      <Stack.Screen name="ChangeImage" component={ChangeImageScreen} />
      <Stack.Screen name="ReadyToPost" component={ReadyToPostScreen} />
    </Stack.Navigator>
  );
}
