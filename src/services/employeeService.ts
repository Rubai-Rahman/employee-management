import api from '@/lib/axios';

// Fetch posts from API
export const fetchEmployee = async () => {
  const response = await api.get('/employees'); // Adjust endpoint as needed
  return response.data;
};
