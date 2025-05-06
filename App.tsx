import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabBar from './router/TabBar';
import LoginRegisterStack from './router/LoginRegisterStack';

function LoginRegisterContainer() {
  return (
    <LoginRegisterStack />
  );
}


function TabContainer() {
  return (
      <TabBar />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <LoginRegisterContainer />
    </NavigationContainer>
  )
}