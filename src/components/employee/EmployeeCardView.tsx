'use client';

import { fetchEmployee } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, User } from 'lucide-react';
import { Button } from '../ui/button';
import { ErrorResultMessage } from '../ui/data-result-message';
import CardSkeleton from './CardSkeleton';
import { Employee } from '@/types/employee';

export default function EmployeeCardView() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {emplyeesData.data.map((employee: Employee) => (
        <Card
          key={employee.employeeId}
          className="relative group bg-secondary text-secondary-foreground"
        >
          <CardContent className="pt-6">
            <div className="absolute top-2 right-2 ">
              <Button
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
                  {' '}
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
  );
}
