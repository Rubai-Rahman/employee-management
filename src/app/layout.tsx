import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles./globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { MenuProvider } from '@/components/providers/MenuProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Employee Management',
  description: 'Employee management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white`}
      >
        <MenuProvider>
          <div className="flex flex-col h-screen">
            {/* Top Navigation Bar */}
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar - collapsible on mobile */}
              <Sidebar />

              {/* Main Content */}
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>
        </MenuProvider>
      </body>
    </html>
  );
}
