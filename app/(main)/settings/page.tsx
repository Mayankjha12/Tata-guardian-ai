'use client';

import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Bell, Database, Zap, Cpu, Globe, Eye, EyeOff, Lock, Server } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [realtime, setRealtime] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-neutral-400">Configure your VitalCore system</p>
      </div>

      {/* User Settings */}
      <Card className="space-y-6">
        <h2 className="text-xl font-semibold">User Settings</h2>

        <div className="space-y-4 border-b border-neutral-700 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Dark Mode</p>
              <p className="text-sm text-neutral-400">Use dark theme for the interface</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-neutral-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Notifications</p>
              <p className="text-sm text-neutral-400">Receive alerts and updates</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                notifications ? 'bg-primary' : 'bg-neutral-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Real-time Updates</p>
              <p className="text-sm text-neutral-400">Enable live data streaming</p>
            </div>
            <button
              onClick={() => setRealtime(!realtime)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                realtime ? 'bg-primary' : 'bg-neutral-700'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  realtime ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* System Status */}
      <Card className="space-y-6">
        <h2 className="text-xl font-semibold">System Status</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Edge Devices */}
          <div className="space-y-3 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Edge Devices</span>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-neutral-400">6 devices connected</p>
              <p className="text-neutral-500">Last sync: 2 minutes ago</p>
            </div>
          </div>

          {/* API Backend */}
          <div className="space-y-3 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-accent-cyan" />
                <span className="font-semibold text-foreground">API Backend</span>
              </div>
              <Badge>Ready</Badge>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-neutral-400">Version 2.1.0</p>
              <p className="text-neutral-500">Uptime: 99.8%</p>
            </div>
          </div>

          {/* ML Pipeline */}
          <div className="space-y-3 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent-purple" />
                <span className="font-semibold text-foreground">ML Pipeline</span>
              </div>
              <Badge>Online</Badge>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-neutral-400">Model v2.1.0 active</p>
              <p className="text-neutral-500">Inference time: 145ms avg</p>
            </div>
          </div>

          {/* Database */}
          <div className="space-y-3 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent-emerald" />
                <span className="font-semibold text-foreground">Database</span>
              </div>
              <Badge>Healthy</Badge>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-neutral-400">PostgreSQL 15.2</p>
              <p className="text-neutral-500">Storage: 42 GB / 100 GB</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Integration Settings */}
      <Card className="space-y-6">
        <h2 className="text-xl font-semibold">Integrations & API</h2>

        <div className="space-y-4 border-b border-neutral-700 pb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-foreground">API Key</p>
              <button className="text-sm text-primary hover:text-primary-light">Regenerate</button>
            </div>
            <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2">
              <code className="text-sm text-neutral-400 font-mono flex-1">vitalcore_sk_live_••••••••••</code>
              <button className="text-neutral-500 hover:text-foreground">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-foreground mb-2">Webhook Events</p>
            <div className="space-y-2">
              {['Vehicle.HealthChanged', 'Alert.Created', 'Maintenance.Scheduled'].map((event) => (
                <div key={event} className="flex items-center gap-2 p-2 bg-neutral-800/50 rounded-lg">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-neutral-400">{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="space-y-6">
        <h2 className="text-xl font-semibold">Security</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-400" />
              <div>
                <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-neutral-400">Secure your account with 2FA</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-semibold text-foreground">Session Management</p>
                <p className="text-sm text-neutral-400">View and manage active sessions</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card variant="default" className="border border-red-500/30 space-y-4">
        <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
        <p className="text-sm text-neutral-400">Irreversible actions</p>
        <Button variant="ghost" className="text-red-500 hover:text-red-400">
          Delete All Data
        </Button>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="secondary">Reset to Default</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
