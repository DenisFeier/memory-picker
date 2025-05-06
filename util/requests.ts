import axios from 'axios';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJQTE0iLCJlbWFpbCI6InRlc3QxQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQ2NTM3MjczLCJleHAiOjE3NDY1ODA0NzN9.n7OuTW5GINQpHZM7qV7Bzzb6lpjz4U6-OGy8-0grBYY"

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${TOKEN}`;
    return config;
  }
);