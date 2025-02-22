import api from '@/lib/axios';

// Fetch posts from API
export const fetchEmployee = async () => {
  const response = await api.get(`/employees`);
  return response.data;
};
// Delete employee by ID
export const deleteEmployeeById = async (id: number) => {
  const response = await api.delete(`/employees/${id}`); // Fixed URL (removed `:`)
  return response.data;
};
