import axios from 'axios';

const api = axios.create({
  baseURL: 'your-api-base-url',
  timeout: 5000,
});

export default api;
