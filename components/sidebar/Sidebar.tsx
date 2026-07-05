'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Gauge,
  Car,
  Bot,
  BarChart3,
  Settings,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/dashboard', label: 'Fleet', icon: Gauge },
  { href: '/vehicle/VH-001', label: 'Vehicle Details', icon: Car },
  { href: '/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className={`glass fixed left-0 top-0 z-50 mt-20 h-[calc(100vh-5rem)] border-r border-neutral-700 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        } hidden sm:flex flex-col`}
      >
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="fixed bottom-6 left-6 z-40 sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-primary rounded-full text-white shadow-lg hover:bg-primary-dark transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 sm:hidden bg-black/50" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
