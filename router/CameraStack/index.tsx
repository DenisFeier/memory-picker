import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CameraStackParamList } from './params';

import CameraScreen from '../../screens/CameraScreen';
import EditPostScreen from '../../screens/EditPostScreen';
import ImageSelectLocationScreen from '../../screens/ImageSelectLocationScreen';
import ChangeImageScreen from '../../screens/ChangeImageScreen';
import ReadyToPostScreen from '../../screens/ReadyToPostScreen';

const Stack = createNativeStackNavigator<CameraStackParams>();

const CameraStack = () => (
  <Stack.Navigator initialRouteName="Camera">
    <Stack.Screen name="Camera" component={CameraScreen} />
    <Stack.Screen name="EditPost" component={EditPostScreen} />
    <Stack.Screen name="ImageSelectLocation" component={ImageSelectLocationScreen} />
    <Stack.Screen name="ChangeImage" component={ChangeImageScreen} />
    <Stack.Screen name="ReadyToPost" component={ReadyToPostScreen} />
  </Stack.Navigator>
);

export default CameraStack;
