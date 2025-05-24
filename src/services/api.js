// /src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API || "https://useum-server.onrender.com",
  withCredentials: false,
});

export default api;
