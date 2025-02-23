import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BASE_URL}/api`, // Now we append `/api` to the URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
