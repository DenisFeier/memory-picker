import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import { LoginRegisterStackProps } from './LoginRegisterStackProps';

const Stack = createStackNavigator<LoginRegisterStackProps>();

const LoginRegisterStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default LoginRegisterStack;
