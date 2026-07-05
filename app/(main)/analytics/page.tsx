'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analytics';
import { Card } from '@/components/common/Card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function AnalyticsPage() {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsService.getAnalytics(),
    staleTime: 60000,
  });

  const colors = {
    primary: '#0ea5e9',
    cyan: '#06b6d4',
    purple: '#a855f7',
    emerald: '#10b981',
    yellow: '#f59e0b',
    orange: '#f97316',
    red: '#ef4444',
  };

  const chartColors = [colors.emerald, colors.cyan, colors.orange, colors.purple];

  if (isLoading) {
    return <div className="text-center py-12 text-neutral-400">Loading analytics...</div>;
  }

  if (!analyticsData) {
    return <div className="text-center py-12 text-neutral-400">No analytics data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Fleet Analytics</h1>
          <p className="text-neutral-400">Comprehensive fleet health and performance metrics</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card className="flex items-center gap-4">
        <Calendar className="h-5 w-5 text-neutral-500" />
        <div className="flex gap-2 flex-wrap">
          {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom'].map((range) => (
            <button
              key={range}
              className="px-3 py-1 rounded-lg text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors"
            >
              {range}
            </button>
          ))}
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-3 gap-4">
        {analyticsData.metrics.map((metric) => (
          <Card key={metric.id}>
            <div className="space-y-2">
              <p className="text-sm text-neutral-500">{metric.name}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                  {metric.unit && <p className="text-xs text-neutral-500">{metric.unit}</p>}
                </div>
                <div className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-red-400' : metric.trend === 'down' ? 'text-green-400' : 'text-neutral-400'}`}>
                  {metric.trendPercentage && (
                    <>
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                      {Math.abs(metric.trendPercentage)}%
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Fleet Health Trend */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Fleet Health Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.fleetHealthTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="value" stroke={colors.primary} strokeWidth={2} dot={false} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Failure Distribution */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Failure Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.failureDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => `${name}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.failureDistribution.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} formatter={(value: any) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Battery Degradation */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Battery Degradation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.batteryDegradation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="value" stroke={colors.yellow} strokeWidth={2} dot={false} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Engine Health */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Engine Health Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.engineHealth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Bar dataKey="value" fill={colors.cyan} isAnimationActive={true} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* RUL Trend */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Remaining Useful Life (RUL) Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.rulTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="value" stroke={colors.purple} strokeWidth={2} dot={false} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts Over Time */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Alerts Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.alertsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Bar dataKey="value" fill={colors.orange} isAnimationActive={true} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Maintenance Cost */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Maintenance Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.maintenanceCost}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={colors.red} strokeWidth={2} dot={false} isAnimationActive={true} name="Cost ($)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Downtime Metrics */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Downtime Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.downtimeMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#e2e8f0' }} />
              <Bar dataKey="value" fill={colors.emerald} isAnimationActive={true} name="Hours" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
