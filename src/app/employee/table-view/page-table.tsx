'use client';

import { EmployeeFormDialog } from '@/components/employee/EmployeeFormDialog';
import EmployeeTableView from '@/components/employee/EmployeeTableView';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { fetchEmployee } from '@/services/employeeService';
import { Employee } from '@/types/employee';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  const [mutationType, setMutationType] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Employee>();

  const { data: employeeData, isError } = useQuery({
    queryKey: ['employee', selectedId],
    queryFn: () => fetchEmployee(selectedId as number),
    enabled: selectedId !== null,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (employeeData && selectedId !== null) {
      setDefaultValues(employeeData);
      setOpenForm(true); // Open form only after data is available
    }
  }, [employeeData, selectedId]);

  if (isError) {
    return <ErrorResultMessage />;
  }

  const handleAddEmployee = () => {
    setDefaultValues({
      employeeId: 0,
      fullName: { firstName: '', lastName: '' },
      phone: '',
      email: '',
      address: { street: '', city: '', country: '' },
      department: '',
      status: 'active',
    });
    setSelectedId(null);
    setOpenForm(true);
    setMutationType('create');
  };

  const handleEditEmployee = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar />
        <Filters />
      </div>

      <div>
        <Button onClick={handleAddEmployee}>Add New Employee</Button>
      </div>

      <EmployeeFormDialog
        open={openForm}
        setOpen={setOpenForm}
        defaultValues={defaultValues}
        type={mutationType}
      />

      <EmployeeTableView onEdit={handleEditEmployee} />
    </div>
  );
}
