'use client';

import { useState } from 'react';
import { Menu, UserRound, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useMenu } from '../providers/MenuProvider';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { toggle } = useMenu();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-background text-foreground border border-b-border">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <Button onClick={toggle} size="sm" className="md:hidden p-2">
            <Menu />
          </Button>
          <h1 className="text-xl font-semibold">Employee Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="secondary-ghost"
                onClick={toggleUserMenu}
              >
                <UserRound />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background text-foreground"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserRound className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
