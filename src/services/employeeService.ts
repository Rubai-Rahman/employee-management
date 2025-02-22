import api from '@/lib/axios';

// Fetch posts from API
export const fetchEmployee = async ({ page = 1, limit = 9 }) => {
  const response = await api.get(`/employees?page=${page}$limit=${limit}`);
  return response.data;
};
