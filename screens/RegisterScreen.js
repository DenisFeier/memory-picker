import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

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

    try {
      const key = `user_${normalizedEmail}`;
      const existingUser = await AsyncStorage.getItem(key);

      if (existingUser) {
        Alert.alert('Error', 'This email is already registered.');
        return;
      }

      await AsyncStorage.setItem(
        key,
        JSON.stringify({ username, password })
      );

      Alert.alert('Account created!', `Welcome, ${username}!`);

      // Clear form
      setEmail('');
      setUsername('');
      setPassword('');
      setRePassword('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data.');
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
