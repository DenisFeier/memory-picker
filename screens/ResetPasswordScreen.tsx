import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { API_URL } from '../util/Constants';
import { LoginRegisterStackProps } from '../router/LoginRegisterStack/LoginRegisterStackProps';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<StackNavigationProp<LoginRegisterStackProps, 'ResetPassword'>>();

  const isValidEmail = (email: string): boolean =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleReset = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/reset-password`, {
        email: normalizedEmail,
      });

      Alert.alert('Success', response.data.message || 'Reset email sent.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: any) {
      console.error('Reset error:', error?.response?.data || error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to send reset email.'
      );
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
