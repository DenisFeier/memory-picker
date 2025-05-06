import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorProps } from '../router/LoginRegisterStack/LoginRegisterStackProps';
import axios from 'axios';
import { API_URL } from '../util/Constants';

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<AppNavigatorProps, 'Register'>>();

  const isValidEmail = (email: string): boolean =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleRegister = async () => {
    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail || !username || !password || !rePassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }

    if (password !== rePassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const data = {
      username,
      password,
      email: normalizedEmail,
    };

    try {
      const response = await axios.post<RegisterResponse>(
        `${API_URL}/api/user/register`, 
        data
      );

      Alert.alert('Success', response.data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: any) {
      console.error('Registration error:', error?.response?.data || error);
      Alert.alert('Error', error?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Memory Picker</Text>

          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <CustomTextInput
            placeholder="Re-Password"
            secureTextEntry
            value={rePassword}
            onChangeText={setRePassword}
          />

          <CustomButton title="Register" onPress={handleRegister} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#123',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
});

export default RegisterScreen;
