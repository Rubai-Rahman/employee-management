'use client';

import { Menu, UserRound } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useMenu } from '../providers/MenuProvider';
import { Button } from '../ui/button';

export default function Navbar() {
  const { toggle } = useMenu();

  return (
    <header className="bg-background text-foreground border border-b-border">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <Button onClick={toggle} size="sm" className="md:hidden p-2">
            <Menu />
          </Button>
          <h1 className="text-xl font-semibold"> Employee Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative">
            <Button size="icon" variant="secondary-ghost">
              <UserRound />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
