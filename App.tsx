import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from './TabBar';

function Container() {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}

export default function App() {
  return <Container />;
}