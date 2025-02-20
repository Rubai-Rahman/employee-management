'use client';

import { useMenu } from './providers/MenuProvider';
import Link from 'next/link';

export default function Sidebar() {
  const { isOpen } = useMenu();

  return (
    <aside
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:block fixed md:relative w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 z-10`}
    >
      <nav className="space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Employee List (Card View)
        </Link>
        <Link
          href="/table"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Employee Table View
        </Link>
      </nav>
    </aside>
  );
}
