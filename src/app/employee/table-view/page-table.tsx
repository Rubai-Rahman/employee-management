'use client';

import { EmployeeFormDialog } from '@/components/employee/EmployeeFormDialog';
import EmployeeTableView from '@/components/employee/EmployeeTableView';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import { fetchEmployee } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const { data: employeeData, isError } = useQuery({
    queryKey: ['employee', selectedId],
    queryFn: () => fetchEmployee(selectedId),
    enabled: selectedId !== 0 && openForm,
  });
  console.log('employeeData', employeeData, 'selectedId', selectedId);

  if (isError) {
    return <ErrorResultMessage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar />
        <Filters />
      </div>
      <EmployeeFormDialog
        open={openForm}
        setOpen={setOpenForm}
        defaultValues={selectedId !== 0 ? employeeData?.data : undefined}
      />
      <EmployeeTableView setId={setSelectedId} setOpenForm={setOpenForm} />
    </div>
  );
}
