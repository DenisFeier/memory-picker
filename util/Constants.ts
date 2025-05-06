import { Platform } from 'react-native';

export const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000'
    : 'http://192.168.1.78:3000';

export const JWT_TOKEN = 'jwt_token';
