import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorProps } from '../router/LoginRegisterStack/LoginRegisterStackProps';
import axios from 'axios';
import { JWT_TOKEN } from '../util/Constants';
import { API_URL } from '../util/Constants';

interface LoginResponse {
  message: string;
  token: string;
}


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<AppNavigatorProps, 'Login'>>();

  const handleLogin = async () => {
    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    const data = {
      email: normalizedEmail,
      password,
    };

    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/api/user/login`, data);
      const token = response.data.token; 
      console.log(token);
      await AsyncStorage.setItem(JWT_TOKEN, token);
    }
    catch(error) {
      console.log(JSON.stringify(error));
    }
  
  }

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
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <CustomButton title="Login" onPress={handleLogin} />

          <View style={styles.row}>
            <Text style={styles.text}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}> Sign UP</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <View style={styles.resetContainer}>
            <Text style={styles.resetLabel}>Forgot your password?</Text>
            <Text style={styles.resetLink}> Reset Pass</Text>
          </View>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  text: {
    color: '#000',
  },
  link: {
    color: 'green',
    fontWeight: 'bold',
  },
  resetContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginTop: 30,
    padding: 10,
    borderRadius: 25,
  },
  resetLabel: {
    fontWeight: 'bold',
  },
  resetLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
