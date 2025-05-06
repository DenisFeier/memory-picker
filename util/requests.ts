import axios from 'axios';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoib3JpY2VlIiwiZW1haWwiOiJvcmljZWVAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDY1MTM2NzEsImV4cCI6MTc0NjU1Njg3MX0.ujk1FQqpqJAX2-tijI8939pn86SsQ1gfATJBtrIEh9E"

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.63.104:3000/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${TOKEN}`;
    return config;
  }
);