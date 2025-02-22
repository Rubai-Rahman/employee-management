'use client';

import { fetchEmployees, deleteEmployeeById } from '@/services/employeeService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import CardSkeleton from './CardSkeleton';
import { Employee } from '@/types/employee';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function EmployeeCardView() {
  const queryClient = useQueryClient();
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<
    number | undefined
  >();

  // Fetch employees
  const {
    data: employeesData,
    error,
    isPending: employeeLoading,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
    select: (data) => data.data,
  });

  // Delete employee mutation
  const { mutate: deleteEmployee, isPending: deleting } = useMutation({
    mutationKey: ['employees_delete'],
    mutationFn: deleteEmployeeById,
    onSuccess: () => toast.success('Employee deleted successfully'),
    onError: () => toast.error('Employee deletion failed'),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setDeletingEmployeeId(undefined);
    },
  });

  if (employeeLoading) return <CardSkeleton />;
  if (error) return <ErrorResultMessage message={error.message} />;

  return (
    <>
      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {employeesData?.map((employee: Employee) => (
          <Card
            key={employee.employeeId}
            className="relative group bg-secondary text-secondary-foreground"
          >
            <CardContent className="pt-6">
              <div className="absolute top-2 right-2">
                <Button
                  onClick={() => setDeletingEmployeeId(employee.employeeId)}
                  variant="secondary-ghost"
                  className="text-destructive/60 hover:text-destructive"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={employee.profilePicture}
                    alt={`${employee.fullName.firstName} ${employee.fullName.lastName} profile picture`}
                  />
                  <AvatarFallback className="bg-muted">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold">
                    {`${employee.fullName.firstName} ${employee.fullName.lastName}`}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {employee.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {employee.department}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
    </>
  );
}
