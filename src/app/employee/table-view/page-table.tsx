'use client';

import { EmployeeFormDialog } from '@/components/employee/EmployeeFormDialog';
import EmployeeTableView from '@/components/employee/EmployeeTableView';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { fetchEmployee } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Only fetch the employee when an id is selected.
  const { data: employeeData, isError } = useQuery({
    queryKey: ['employee', selectedId],
    queryFn: () => fetchEmployee(selectedId as number),
    enabled: selectedId !== null,
    select: (data) => data.data,
  });

  if (isError) {
    return <ErrorResultMessage />;
  }

  const handleAddEmployee = () => {
    // Reset selectedId to ensure no default values are loaded.
    setSelectedId(null);
    setOpenForm(true);
  };

  console.log('singleEmployeeData', employeeData);

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
        // If no employee is selected (adding new), pass undefined to trigger empty form defaults.
        defaultValues={selectedId !== null ? employeeData : undefined}
      />
      <EmployeeTableView setId={setSelectedId} setOpenForm={setOpenForm} />
    </div>
  );
}
