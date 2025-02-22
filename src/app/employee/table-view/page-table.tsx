'use client';
import { EmployeeFormDialog } from '@/components/employee/EmployeeFormDialog';
import EmployeeTableView from '@/components/employee/EmployeeTableView';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { useState } from 'react';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar />
        <Filters />
      </div>
      <EmployeeFormDialog open={openForm} setOpen={setOpenForm} />
      <EmployeeTableView />
    </div>
  );
}
