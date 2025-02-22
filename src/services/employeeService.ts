import api from '@/lib/axios';

// Fetch employess from API
export const fetchEmployees = async () => {
  const response = await api.get(`/employees`);
  return response.data;
};
// Fetch employeeById from API
export const fetchEmployee = async (id: number | null) => {
  console.log('serviceId', id);
  const response = await api.get(`/employees/${id}`);
  return response.data;
};
// Delete employee by ID
export const deleteEmployeeById = async (id: number) => {
  const response = await api.delete(`/employees/${id}`); // Fixed URL (removed `:`)
  return response.data;
};
