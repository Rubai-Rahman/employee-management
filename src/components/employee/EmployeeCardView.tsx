'use client';

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  department: string;
};

export const dummyEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, City, State',
    department: 'Marketing',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
  {
    id: 4,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
  {
    id: 5,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
  {
    id: 6,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
  {
    id: 7,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
  {
    id: 8,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
  {
    id: 9,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd, City, State',
    department: 'Sales',
  },
];

export default function EmployeeCardView() {
  const employees = dummyEmployees;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{employee.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee.phone}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {employee.department}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
