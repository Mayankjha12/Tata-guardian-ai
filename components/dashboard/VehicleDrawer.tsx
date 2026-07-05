'use client';

import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '@/services/vehicle';
import { predictionService } from '@/services/prediction';
import { alertService } from '@/services/alert';
import { Vehicle } from '@/types/vehicle';
import { Badge } from '@/components/common/Badge';
import { getStatusLabel, getHealthScoreColor } from '@/utils/helpers';
import { Loader, Zap, AlertCircle, TrendingUp, Wrench, Gauge } from 'lucide-react';

interface VehicleDrawerProps {
  vehicle: Vehicle;
}

export function VehicleDrawer({ vehicle }: VehicleDrawerProps) {
  // Fetch predictions
  const { data: prediction, isLoading: predictionLoading } = useQuery({
    queryKey: ['prediction', vehicle.id],
    queryFn: () => predictionService.getPrediction(vehicle.id),
    staleTime: 60000,
  });

  // Fetch alerts
  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts', vehicle.id],
    queryFn: () => alertService.getAlerts(vehicle.id),
    staleTime: 30000,
  });

  const healthScoreColor = getHealthScoreColor(vehicle.healthScore);

  return (
    <div className="space-y-6">
      {/* Vehicle Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-neutral-400">{vehicle.licensePlate}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="status" status={vehicle.status}>
            {getStatusLabel(vehicle.status)}
          </Badge>
          <span className={`text-2xl font-bold ${healthScoreColor}`}>
            {vehicle.healthScore}%
          </span>
        </div>
      </div>

      {/* Vehicle Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-lg p-3 space-y-1">
          <p className="text-xs text-neutral-500 uppercase">Mileage</p>
          <p className="text-lg font-semibold">{(vehicle.mileage / 1000).toFixed(1)}K km</p>
        </div>
        <div className="glass rounded-lg p-3 space-y-1">
          <p className="text-xs text-neutral-500 uppercase">Year</p>
          <p className="text-lg font-semibold">{vehicle.year}</p>
        </div>
        <div className="glass rounded-lg p-3 space-y-1">
          <p className="text-xs text-neutral-500 uppercase">VIN</p>
          <p className="text-xs font-semibold font-mono">{vehicle.vin.slice(-8)}</p>
        </div>
        <div className="glass rounded-lg p-3 space-y-1">
          <p className="text-xs text-neutral-500 uppercase">Location</p>
          <p className="text-xs">{vehicle.location.address.split(',')[0]}</p>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-neutral-500">Component Health</p>
        <div className="space-y-2">
          {Object.entries(vehicle.healthMetrics).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 capitalize">
                  {key.replace(/Health/g, '').replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-semibold">{value}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    value >= 80
                      ? 'bg-status-healthy'
                      : value >= 60
                      ? 'bg-yellow-500'
                      : value >= 40
                      ? 'bg-orange-500'
                      : 'bg-status-critical'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-neutral-500 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Failure Predictions
        </p>
        {predictionLoading ? (
          <div className="flex items-center gap-2 text-neutral-500">
            <Loader className="h-4 w-4 animate-spin" />
            <span className="text-xs">Loading predictions...</span>
          </div>
        ) : prediction ? (
          <div className="space-y-2">
            {prediction.failureRisks.map((risk, idx) => (
              <div key={idx} className="glass rounded-lg p-3 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-sm">{risk.component}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {(risk.probability * 100).toFixed(0)}% risk
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  RUL: {Math.round(risk.estimatedRUL)} days
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Active Alerts */}
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-neutral-500 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Recent Alerts ({alerts.length})
        </p>
        {alertsLoading ? (
          <div className="flex items-center gap-2 text-neutral-500">
            <Loader className="h-4 w-4 animate-spin" />
            <span className="text-xs">Loading alerts...</span>
          </div>
        ) : alerts.length > 0 ? (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg p-3 border-l-2 space-y-1 ${
                  alert.severity === 'critical'
                    ? 'bg-red-500/10 border-red-500'
                    : alert.severity === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500'
                    : 'bg-blue-500/10 border-blue-500'
                }`}
              >
                <p className="text-xs font-semibold uppercase">{alert.type}</p>
                <p className="text-xs text-neutral-400">{alert.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-500">No active alerts</p>
        )}
      </div>

      {/* Maintenance */}
      <div className="glass rounded-lg p-4 space-y-2 border border-accent-cyan/30">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-accent-cyan" />
          <span className="text-sm font-semibold">Maintenance Recommendation</span>
        </div>
        <p className="text-xs text-neutral-400">
          {vehicle.healthScore < 50
            ? 'Schedule maintenance immediately. Vehicle health is critical.'
            : vehicle.healthScore < 70
            ? 'Schedule maintenance within the next 2 weeks.'
            : 'Vehicle is in good condition. Routine maintenance recommended.'}
        </p>
        {vehicle.maintenanceDate && (
          <p className="text-xs text-accent-cyan font-semibold">
            Scheduled: {new Date(vehicle.maintenanceDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
