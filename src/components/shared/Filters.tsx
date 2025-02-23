'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const departments = [
  'Human Resources',
  'Marketing',
  'Sales',
  'Engineering',
  'Finance',
  'Operations',
  'Customer Support',
];

interface FiltersProps {
  onSearch: (value: string) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [department, setDepartment] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    onSearch(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onSearch(value);
  };

  const clearFilters = () => {
    setDepartment(undefined);
    setStatus(undefined);
    onSearch('');
  };

  return (
    <div className="flex gap-4 items-center">
      <Select value={department} onValueChange={handleDepartmentChange}>
        <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={clearFilters}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
        aria-label="Clear filters"
      >
        <X className="" />
      </Button>
    </div>
  );
}
