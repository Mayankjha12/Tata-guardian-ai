'use client';

import { Vehicle } from '@/types/vehicle';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { getStatusLabel, getHealthScoreColor } from '@/utils/helpers';
import { Gauge, MapPin, Zap } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const healthScoreColor = getHealthScoreColor(vehicle.healthScore);

  return (
    <button onClick={() => onClick?.(vehicle)} className="w-full text-left">
      <Card interactive variant="default" className="h-full">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-sm text-neutral-400">{vehicle.licensePlate}</p>
            </div>
            <Badge variant="status" status={vehicle.status}>
              {getStatusLabel(vehicle.status)}
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-neutral-500">Health Score</p>
              <p className={`text-2xl font-bold ${healthScoreColor}`}>
                {vehicle.healthScore}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-neutral-500">Mileage</p>
              <p className="text-lg font-semibold">{(vehicle.mileage / 1000).toFixed(1)}K</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{vehicle.location.address}</span>
          </div>

          {/* Battery Status */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-500">Battery Health</span>
              <span className="text-foreground font-semibold">
                {vehicle.healthMetrics.batteryHealth}%
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-status-healthy to-accent-emerald h-2 rounded-full"
                style={{ width: `${vehicle.healthMetrics.batteryHealth}%` }}
              />
            </div>
          </div>

          {/* Last Seen */}
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Zap className="h-3 w-3" />
            <span>
              Last seen {Math.floor((Date.now() - vehicle.lastSeen.getTime()) / 60000)} minutes ago
            </span>
          </div>
        </div>
      </Card>
    </button>
  );
}
