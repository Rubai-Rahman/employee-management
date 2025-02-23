'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  return (
    <div className="flex gap-4 ">
      <Select onValueChange={onSearch}>
        <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          {departments.map((department) => (
            <SelectItem key={department} value={department}>
              {department}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onSearch}>
        <SelectTrigger className="w-[180px] bg-secondary text-secondary-foreground">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
