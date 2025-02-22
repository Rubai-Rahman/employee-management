'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pencil, Trash2, User } from 'lucide-react';
import { fetchEmployees } from '@/services/employeeService';
import { ErrorResultMessage } from '../ui/data-result-message';
import { Employee } from '@/types/employee';
import TableSkeleton from './TableSkeleton';
interface EmployeeTableViewProps {
  setId: (id: number) => void;
  setOpenForm: (open: boolean) => void;
}
// Constants
const ITEMS_PER_PAGE = 10;

export default function EmployeeTableView({
  setId,
  setOpenForm,
}: EmployeeTableViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: employeesData,
    error,
    isPending,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  // Memoize paginated data
  const paginatedData = useMemo(() => {
    if (!employeesData?.data) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return employeesData.data.slice(start, end);
  }, [employeesData, currentPage]);

  // Memoize total pages
  const totalPages = useMemo(
    () =>
      employeesData?.data
        ? Math.ceil(employeesData.data.length / ITEMS_PER_PAGE)
        : 0,
    [employeesData]
  );

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };
  const handleEdit = (id: number) => {
    setId(id);
    setOpenForm(true);
  };
  // Get initials for avatar fallback
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  if (isPending) return <TableSkeleton />;
  if (error) return <ErrorResultMessage message={error.message} />;

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((employee: Employee) => (
              <TableRow key={employee.employeeId ?? employee.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={employee.profilePicture}
                      alt={`${employee.fullName.firstName} ${employee.fullName.lastName}'s profile picture`}
                    />
                    <AvatarFallback>
                      {employee.profilePicture ? (
                        <User className="h-4 w-4" />
                      ) : (
                        getInitials(
                          employee.fullName.firstName,
                          employee.fullName.lastName
                        )
                      )}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {`${employee.fullName.firstName} ${employee.fullName.lastName}`}
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleEdit(employee.employeeId ?? employee.id)
                      }
                      variant="ghost"
                      size="icon"
                      className="hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive/60 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">
                        Delete {employee.fullName.firstName}{' '}
                        {employee.fullName.lastName}
                      </span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
