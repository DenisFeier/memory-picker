import axios from 'axios';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJQTE0iLCJlbWFpbCI6InRlc3QxQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQ2MTc2NTc2LCJleHAiOjE3NDYyMTk3NzZ9.zgvpZ9HoCDzT0iOk30K71Iud0Jz4z53F3pTbrAuYOWw"

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${TOKEN}`;
    return config;
  }
);