'use client';
import { EmployeeFormDialog } from '@/components/employee/EmployeeFormDialog';
import EmployeeTableView from '@/components/employee/EmployeeTableView';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { fetchEmployee } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: employeeData } = useQuery({
    queryKey: ['employee'],
    queryFn: () => fetchEmployee(selectedId ?? 0),
  });
  console.log('employeeData', employeeData, selectedId);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar />
        <Filters />
      </div>
      <EmployeeFormDialog
        open={openForm}
        setOpen={setOpenForm}
        defaultValues={employeeData?.data}
      />
      <EmployeeTableView setId={setSelectedId} setOpenForm={setOpenForm} />
    </div>
  );
}
