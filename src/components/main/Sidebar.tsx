'use client';
import React from 'react';
import { useMenu } from '../providers/MenuProvider';
import { Users } from 'lucide-react';
import { Button, NavButton } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
  exclude?: Array<string>;
  subItems?: Omit<NavItem, 'icon'>[];
}

const navItems = [
  {
    icon: Users,
    label: 'Employee',
    path: '/employee',
    subItems: [
      { label: 'Card View', path: '/employee' },
      {
        label: 'Table View',
        path: '/employee/table-view',
      },
    ],
  },
];

export default function Sidebar() {
  const { isOpen } = useMenu();

  return (
    <aside
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:block fixed md:relative w-52 h-full p-4 z-10 bg-background text-foreground border border-b-border`}
    >
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </nav>
    </aside>
  );
}

const SidebarItem = React.memo(
  ({ icon: Icon, label, path, active = false, subItems }: NavItem) => {
    if (subItems && subItems.length > 0) {
      return (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="secondary-ghost"
              data-active={active || undefined}
              className="w-full justify-start gap-3 border-y-0 border-l-2 border-r-0 border-transparent px-4 py-3.5 data-[active]:border-primary data-[active]:bg-secondary data-[active]:text-primary"
            >
              <Icon />
              <span className="text-sm font-medium">{label}</span>
              <ChevronDown className="ml-auto transform transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mx-3 flex flex-col text-sm">
              {subItems.map((subItem, index) => (
                <NavButton
                  key={index}
                  path={subItem.path}
                  active={subItem.active}
                  className="w-full justify-start gap-3 px-4 py-2 font-medium hover:bg-secondary"
                >
                  {subItem.label}
                </NavButton>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    if (path) {
      return (
        <NavButton path={path} active={active}>
          <Icon />
          <span className="text-sm font-medium">{label}</span>
        </NavButton>
      );
    }

    return null;
  }
);
SidebarItem.displayName = 'SidebarItem';
