'use client';

import ThemeToggle from './ThemeToggle';
import { useMenu } from './providers/MenuProvider';

export default function Navbar() {
  const { toggle } = useMenu();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">👥 Employee Management</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
