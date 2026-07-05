'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Sidebar } from '@/components/sidebar/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 sm:ml-20 md:ml-64 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
