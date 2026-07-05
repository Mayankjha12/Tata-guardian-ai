'use client';

import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Activity, Zap, TrendingUp, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary font-semibold">Edge AI Powered Fleet Management</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-balance">
          VitalCore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-cyan">Edge AI</span>
        </h1>

        <p className="text-xl text-neutral-400 text-balance max-w-2xl mx-auto">
          Production-grade vehicle health monitoring and predictive maintenance powered by edge computing
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              View Fleet Dashboard
            </Button>
          </Link>
          <Link href="/assistant">
            <Button variant="outline" size="lg">
              Open AI Assistant
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="accent">
          <div className="flex gap-4">
            <div className="p-3 rounded-lg bg-primary/20 h-fit">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Real-time Monitoring</h3>
              <p className="text-neutral-400">
                Monitor vehicle health metrics and sensor data in real-time with edge-deployed AI
              </p>
            </div>
          </div>
        </Card>

        <Card variant="accent">
          <div className="flex gap-4">
            <div className="p-3 rounded-lg bg-accent-cyan/20 h-fit">
              <TrendingUp className="h-6 w-6 text-accent-cyan" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Predictive Maintenance</h3>
              <p className="text-neutral-400">
                Predict component failures before they occur with ML-powered RUL estimates
              </p>
            </div>
          </div>
        </Card>

        <Card variant="accent">
          <div className="flex gap-4">
            <div className="p-3 rounded-lg bg-accent-purple/20 h-fit">
              <Shield className="h-6 w-6 text-accent-purple" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Safety & Compliance</h3>
              <p className="text-neutral-400">
                Ensure vehicle safety standards and regulatory compliance with automated alerts
              </p>
            </div>
          </div>
        </Card>

        <Card variant="accent">
          <div className="flex gap-4">
            <div className="p-3 rounded-lg bg-accent-emerald/20 h-fit">
              <Zap className="h-6 w-6 text-accent-emerald" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Edge Computing</h3>
              <p className="text-neutral-400">
                Low-latency processing with edge-deployed models, no cloud dependency
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Active Vehicles</p>
            <p className="text-3xl font-bold">6</p>
            <p className="text-xs text-neutral-500">All online and monitored</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Avg Fleet Health</p>
            <p className="text-3xl font-bold">78%</p>
            <p className="text-xs text-neutral-500">Within normal range</p>
          </div>
        </Card>
        <Card>
          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Alerts Active</p>
            <p className="text-3xl font-bold text-status-critical">3</p>
            <p className="text-xs text-neutral-500">Require attention</p>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <Card variant="accent" className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Get Started with VitalCore</h2>
        <p className="text-neutral-400 max-w-md mx-auto">
          Begin monitoring your fleet and optimizing maintenance with our AI-powered platform
        </p>
        <Link href="/dashboard">
          <Button variant="primary">View Fleet Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
