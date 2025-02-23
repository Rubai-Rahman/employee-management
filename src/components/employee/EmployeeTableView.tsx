'use client';

import { useState, useMemo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { deleteEmployeeById } from '@/services/employeeService';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Employee } from '@/types/employee';
import { EmptyResultMessage } from '../ui/data-result-message';

const ITEMS_PER_PAGE = 10;

export default function EmployeeTableView({
  onEdit,
  employeesData,
}: {
  onEdit: (id: number) => void;
  employeesData: Employee[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<
    number | undefined
  >();
  const qc = useQueryClient();

  const { mutate: deleteEmployee, isPending: deleting } = useMutation({
    mutationKey: ['employees_delete'],
    mutationFn: deleteEmployeeById,
    onSuccess: () => toast.success('Employee deleted successfully'),
    onError: () => toast.error('Employee deletion failed'),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['employees'] });
      setDeletingEmployeeId(undefined);
    },
  });
  const employees = useMemo(() => {
    return employeesData ?? [];
  }, [employeesData]);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return employees.slice(start, start + ITEMS_PER_PAGE);
  }, [employees, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(newPage);
    },
    [totalPages]
  );

  const getInitials = useCallback((firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }, []);
  if (employeesData.length === 0)
    return <EmptyResultMessage message="No Employe found" />;
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
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((employee: Employee) => {
              const { firstName, lastName } = employee.fullName;
              return (
                <TableRow key={employee._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={employee.profilePicture}
                        alt={`${firstName} ${lastName}`}
                      />
                      <AvatarFallback>
                        {employee.profilePicture ? (
                          <User className="h-4 w-4" />
                        ) : (
                          getInitials(firstName, lastName)
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{`${firstName} ${lastName}`}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onEdit(employee?.employeeId ?? null)}
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() =>
                          setDeletingEmployeeId(employee.employeeId)
                        }
                        variant="ghost"
                        size="icon"
                        className="text-destructive/60 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deletingEmployeeId)}
        onOpenChange={() => setDeletingEmployeeId(undefined)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone.</p>
          <DialogFooter>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteEmployee(deletingEmployeeId!)}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
