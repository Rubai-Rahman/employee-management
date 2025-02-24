'use client';

import { useState, useEffect, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import debounce from 'lodash/debounce';

// Custom hook for debounced values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}

// Memoized search and filter controls component
const SearchControls = memo(
  ({
    searchValue,
    onSearch,
    onFilter,
  }: {
    searchValue: string;
    onSearch: (value: string) => void;
    onFilter: (value: string) => void;
  }) => {
    return (
      <>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <SearchBar onSearch={onSearch} value={searchValue} />
          <Filters onSearch={onFilter} />
        </div>

        <div>
          <Button onClick={() => onFilter('add-button-clicked')}>
            Add New Employee
          </Button>
        </div>
      </>
    );
  }
);

// Memoized table component to prevent re-renders
const EmployeeTableSection = memo(
  ({
    isPending,
    error,
    employeesData,
    onEdit,
  }: {
    isPending: boolean;
    error: Error | null;
    employeesData: Employee[];
    onEdit: (id: number) => void;
  }) => {
    if (error) return <ErrorResultMessage message={error.message} />;

    return isPending ? (
      <TableSkeleton />
    ) : (
      <EmployeeTableView onEdit={onEdit} employeesData={employeesData} />
    );
  }
);

// Give display names to help with debugging
SearchControls.displayName = 'SearchControls';
EmployeeTableSection.displayName = 'EmployeeTableSection';

export default function TableViewPage() {
  const [openForm, setOpenForm] = useState(false);
  const [mutationType, setMutationType] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Employee>();
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  // Use our custom debounce hook
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  // Query for fetching a single employee for editing
  const { data: employeeData } = useQuery({
    queryKey: ['employee', selectedId],
    queryFn: () => fetchEmployee(selectedId as number),
    enabled: selectedId !== null,
    select: (data) => data.data,
  });

  // Query for fetching all employees with search and filter
  const {
    data: employeesData,
    error,
    isPending,
  } = useQuery({
    queryKey: ['employees', debouncedSearchValue, filterValue],
    queryFn: () => fetchEmployeesParams(debouncedSearchValue, filterValue),
    select: (data) => data.data,
  });

  // Effect to handle opening the form when employee data is loaded
  useEffect(() => {
    if (employeeData && selectedId !== null) {
      setDefaultValues(employeeData);
      setOpenForm(true);
    }
  }, [employeeData, selectedId]);

  const handleSearchEmployee = (value: string) => {
    setSearchValue(value);
  };

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
    if (value === 'add-button-clicked') {
      handleAddEmployee();
      return;
    }
    setFilterValue(value);
  };

  return (
    <div className="space-y-6">
      {/* Memoized search controls that won't re-render when table data changes */}
      <SearchControls
        searchValue={searchValue}
        onSearch={handleSearchEmployee}
        onFilter={handleFilterEmployee}
      />

      <EmployeeFormDialog
        open={openForm}
        setOpen={setOpenForm}
        defaultValues={defaultValues}
        type={mutationType}
      />

      {/* Memoized table section that will re-render independently */}
      <EmployeeTableSection
        isPending={isPending}
        error={error as Error | null}
        employeesData={employeesData}
        onEdit={handleEditEmployee}
      />
    </div>
  );
}
