'use client';

import { Activity, Bell, Settings, User } from 'lucide-react';

export function Navbar() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-neutral-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">VitalCore Edge AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <Bell className="h-5 w-5 text-neutral-400 hover:text-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-status-critical rounded-full" />
          </button>
          
          <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <Settings className="h-5 w-5 text-neutral-400 hover:text-foreground" />
          </button>
          
          <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <User className="h-5 w-5 text-neutral-400 hover:text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
