import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { JWT_TOKEN } from './Constants';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(JWT_TOKEN);
    if (!token) {
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);