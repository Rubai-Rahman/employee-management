'use client';

import { Input } from '../ui/input';

export default function SearchBar() {
  return (
    <div className="w-full sm:w-96 bg-secondary text-secondary-foreground">
      <Input type="search" placeholder="Search employees by name or email..." />
    </div>
  );
}
