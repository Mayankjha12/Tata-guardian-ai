'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, Zap, MessageCircle, BarChart3, Bell, Settings, User, LogOut } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navItems = [
    { icon: Activity, label: 'Logo', href: '/', className: 'mr-2' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Zap, label: 'Fleet', href: '/dashboard' },
    { icon: MessageCircle, label: 'AI Assistant', href: '/assistant' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-lg rounded-full px-2 py-2 flex items-center gap-1 shadow-xl border border-accent-cyan/30">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-neutral-800/50 transition-colors"
        >
          <Activity className="h-5 w-5 text-accent-cyan" />
          <span className="text-sm font-semibold text-foreground hidden sm:inline">VitalCore</span>
        </Link>

        {/* Separator */}
        <div className="w-px h-6 bg-neutral-700/50" />

        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive(item.href)
                  ? 'bg-primary/30 text-primary'
                  : 'text-neutral-400 hover:text-foreground hover:bg-neutral-800/50'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-neutral-700/50" />

        {/* Right Items */}
        <div className="flex items-center gap-1">
          <button className="relative p-2 rounded-full hover:bg-neutral-800/50 transition-colors">
            <Bell className="h-5 w-5 text-neutral-400 hover:text-accent-cyan" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-status-critical rounded-full animate-pulse-glow" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
            >
              <User className="h-5 w-5 text-neutral-400 hover:text-accent-cyan" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-lg rounded-xl border border-neutral-700/50 shadow-xl animate-fade-in">
                <div className="p-3 space-y-2">
                  <div className="px-3 py-2 text-xs font-semibold text-neutral-400">Profile</div>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800/50 text-sm text-foreground flex items-center gap-2 transition-colors">
                    <User className="h-4 w-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800/50 text-sm text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <div className="border-t border-neutral-700/50 my-2" />
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/10 text-sm text-red-400 flex items-center gap-2 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
