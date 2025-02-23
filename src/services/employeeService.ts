import api from '@/lib/axios';
import { Employee } from '@/types/employee';

// Fetch employess from API
export const fetchEmployees = async () => {
  const response = await api.get(`/employees`);
  return response.data;
};
// Fetch employess from API
export const fetchEmployeesParams = async (
  search?: string,
  filter?: string
) => {
  const params: Record<string, string> = {};

  if (search) params.search = search;
  if (filter) params.filter = filter;

  const response = await api.get(`/employees`, { params });
  return response.data;
};

// Fetch employeeById from API
export const fetchEmployee = async (id: number | null) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};
export const createNewEmployee = async (employeeData: Employee) => {
  const response = await api.post(`/employees/create-employee`, employeeData);
  return response.data;
};
export const updateEmployee = async (employeeData: Employee) => {
  const response = await api.put(
    `/employees/${employeeData.employeeId}`,
    employeeData
  );
  return response.data;
};
// Delete employee by ID
export const deleteEmployeeById = async (id: number) => {
  const response = await api.delete(`/employees/${id}`); // Fixed URL (removed `:`)
  return response.data;
};
