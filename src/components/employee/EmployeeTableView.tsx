'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchEmployee } from '@/services/employeeService';
import { ErrorResultMessage } from '../ui/data-result-message';
import CardSkeleton from './CardSkeleton';
type Employee = {
  employeeId?: number;
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

export default function EmployeeTableView() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: emplyeesData,
    error,
    isPending,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployee,
  });
  if (isPending) return <CardSkeleton />;
  if (error) return <ErrorResultMessage message={error.message} />;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(emplyeesData.data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return emplyeesData.data.slice(start, end);
  };

  return (
    <div className="space-y-4 bg-secondary text-secondary-foreground">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((employee: Employee) => (
            <TableRow key={employee.employeeId}>
              <TableCell>
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  👤
                </div>
              </TableCell>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive/60 hover:text-destructive"
                    size="icon"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
