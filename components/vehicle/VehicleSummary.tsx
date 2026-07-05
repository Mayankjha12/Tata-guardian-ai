'use client';

import { Vehicle } from '@/types/vehicle';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { getStatusLabel, getHealthScoreColor, getHealthScoreBgColor, formatDate } from '@/utils/helpers';
import { MapPin, Gauge, AlertCircle } from 'lucide-react';

interface VehicleSummaryProps {
  vehicle: Vehicle;
}

export function VehicleSummary({ vehicle }: VehicleSummaryProps) {
  const healthColorText = getHealthScoreColor(vehicle.healthScore);
  const healthColorBg = getHealthScoreBgColor(vehicle.healthScore);

  return (
    <Card variant="accent" className="space-y-6">
      {/* Vehicle Identification */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{vehicle.make} {vehicle.model}</h1>
            <p className="text-neutral-400">{vehicle.year} • VIN: {vehicle.vin}</p>
          </div>
          <Badge variant="status" status={vehicle.status}>
            {getStatusLabel(vehicle.status)}
          </Badge>
        </div>

        {/* License Plate */}
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 rounded-lg border border-neutral-700 w-fit">
          <span className="text-sm font-mono font-bold text-primary">{vehicle.licensePlate}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-neutral-500">Health Score</p>
          <div className={`p-4 rounded-lg ${healthColorBg}`}>
            <p className={`text-3xl font-bold ${healthColorText}`}>
              {vehicle.healthScore}%
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-neutral-500">Mileage</p>
          <div className="p-4 rounded-lg bg-neutral-800/50">
            <p className="text-3xl font-bold text-foreground">
              {(vehicle.mileage / 1000).toFixed(1)}K
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-neutral-500">Last Maintenance</p>
          <div className="p-4 rounded-lg bg-neutral-800/50">
            <p className="text-sm font-semibold text-foreground">
              {formatDate(vehicle.lastMaintenance)}
            </p>
          </div>
        </div>
      </div>

      {/* Location & Status */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/20">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Current Location</p>
            <p className="text-foreground font-semibold">{vehicle.location.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-accent-cyan/20">
            <Gauge className="h-5 w-5 text-accent-cyan" />
          </div>
          <div>
            <p className="text-sm text-neutral-500">GPS Tracking</p>
            <p className="text-foreground font-semibold">{vehicle.gpsTracking ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </div>

      {/* Health Metrics Breakdown */}
      <div className="space-y-3 border-t border-neutral-700 pt-6">
        <h3 className="font-semibold text-foreground">Component Health</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(vehicle.healthMetrics).map(([component, value]) => (
            <div key={component} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400 capitalize">{component.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-foreground font-semibold">{value}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    value >= 80
                      ? 'bg-status-healthy'
                      : value >= 60
                      ? 'bg-yellow-400'
                      : value >= 40
                      ? 'bg-orange-400'
                      : 'bg-status-critical'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {vehicle.maintenanceDate && (
        <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-300">Maintenance Scheduled</p>
            <p className="text-xs text-orange-200">{formatDate(vehicle.maintenanceDate)}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
