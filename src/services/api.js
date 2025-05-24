// /src/services/api.js

import axios from 'axios';
import API_URL from './apiConfig';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies, etc.
});

export default api;
