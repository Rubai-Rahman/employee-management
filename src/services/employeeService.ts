import api from '@/lib/axios';

// Fetch posts from API
export const fetchEmployee = async () => {
  const response = await api.get(`/employees`);
  return response.data;
};
