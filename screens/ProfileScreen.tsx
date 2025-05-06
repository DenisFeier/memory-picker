import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenWrapper from '../components/ScreenWrapper';
import { JWT_TOKEN } from '../util/Constants';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { setAuth } = useContext(AuthContext);
    
  const handleLogout = async () => {
    await AsyncStorage.removeItem(JWT_TOKEN);
    setAuth(false);
  };  

  return (
    <ScreenWrapper>
      <View style={styles.centered}>
        <Button title='Logout' onPress={handleLogout} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
