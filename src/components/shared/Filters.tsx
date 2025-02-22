'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FiltersProps {
  onDepartmentChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
}

export default function Filters({
  onDepartmentChange,
  onStatusChange,
}: FiltersProps) {
  return (
    <div className="flex gap-4 ">
      <Select onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
          <SelectValue placeholder="All Departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="sales">Sales</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
