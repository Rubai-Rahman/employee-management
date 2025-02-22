'use client';

import { Input } from '../ui/input';

export default function SearchBar() {
  return (
    <div className="w-full rounded-md sm:w-96 ">
      <Input
        type="search"
        className="bg-secondary text-secondary-foreground"
        placeholder="Search employees by name or email..."
      />
    </div>
  );
}
