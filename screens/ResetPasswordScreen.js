import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      const key = `user_${normalizedEmail}`;
      const userData = await AsyncStorage.getItem(key);

      if (!userData) {
        Alert.alert('Error', 'No account found with this email.');
        return;
      }

      // Simulare trimitere email
      Alert.alert('Email Sent', `Password reset link sent to ${normalizedEmail}`);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while checking your account.');
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Reset-Pass</Text>
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomButton title="Send Email" onPress={handleReset} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FCEED8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 25,
  },
});

export default ResetPasswordScreen;
