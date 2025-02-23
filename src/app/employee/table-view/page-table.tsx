'use client';

import { EmployeeFormDialog } from '@/components/employee/EmployeeFormDialog';
import EmployeeTableView from '@/components/employee/EmployeeTableView';
import TableSkeleton from '@/components/employee/TableSkeleton';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import {
  fetchEmployee,
  fetchEmployeesParams,
} from '@/services/employeeService';
import { Employee } from '@/types/employee';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useState, useEffect, useCallback, useMemo } from 'react';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  const [mutationType, setMutationType] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Employee>();
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const { data: employeeData } = useQuery({
    queryKey: ['employee', selectedId],
    queryFn: () => fetchEmployee(selectedId as number),
    enabled: selectedId !== null,
    select: (data) => data.data,
  });

  const {
    data: employeesData,
    error,
    isPending,
  } = useQuery({
    queryKey: ['employees', searchValue, filterValue],
    queryFn: () => fetchEmployeesParams(searchValue, filterValue),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (employeeData && selectedId !== null) {
      setDefaultValues(employeeData);
      setOpenForm(true); // Open form only after data is available
    }
  }, [employeeData, selectedId]);

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearchValue(value);
    }, 500);
  }, []);
  const handleSearchEmployee = useCallback(
    (value: string) => {
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  if (isPending) return <TableSkeleton />;
  if (error) return <ErrorResultMessage message={error.message} />;

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

  const handleFilterEmployee = (value: string) => {
    setFilterValue(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar onSearch={handleSearchEmployee} value={searchValue} />
        <Filters onSearch={handleFilterEmployee} />
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

      <EmployeeTableView
        onEdit={handleEditEmployee}
        employeesData={employeesData}
      />
    </div>
  );
}
