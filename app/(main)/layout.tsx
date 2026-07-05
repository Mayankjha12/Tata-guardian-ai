'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 p-4 sm:p-6 overflow-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
