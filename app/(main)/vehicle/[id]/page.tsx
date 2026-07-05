'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '@/services/vehicle';
import { predictionService } from '@/services/prediction';
import { alertService } from '@/services/alert';
import { VehicleSummary } from '@/components/vehicle/VehicleSummary';
import { PredictionPanel } from '@/components/vehicle/PredictionPanel';
import { AlertTimeline } from '@/components/vehicle/AlertTimeline';
import { Card } from '@/components/common/Card';

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setVehicleId(p.id));
  }, [params]);

  // Fetch vehicle data
  const { data: vehicle, isLoading: vehicleLoading } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => vehicleService.getVehicle(vehicleId!),
    enabled: !!vehicleId,
    staleTime: 30000,
  });

  // Fetch predictions
  const { data: prediction, isLoading: predictionLoading } = useQuery({
    queryKey: ['prediction', vehicleId],
    queryFn: () => predictionService.getPrediction(vehicleId!),
    enabled: !!vehicleId,
    staleTime: 60000,
  });

  // Fetch alerts
  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts', vehicleId],
    queryFn: () => alertService.getAlerts(vehicleId!),
    enabled: !!vehicleId,
    staleTime: 30000,
  });

  if (!vehicleId || vehicleLoading) {
    return (
      <div className="text-center py-12 text-neutral-400">
        Loading vehicle data...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12 text-neutral-400">
        Vehicle not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Vehicle Details</h1>
        <p className="text-neutral-400">View and manage vehicle information</p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Vehicle Summary */}
        <div className="lg:col-span-2">
          <VehicleSummary vehicle={vehicle} />
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="font-semibold text-foreground">Owner Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-neutral-500">Owner</p>
                <p className="text-foreground font-semibold">{vehicle.owner}</p>
              </div>
              <div>
                <p className="text-neutral-500">Year</p>
                <p className="text-foreground font-semibold">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-neutral-500">ID</p>
                <p className="text-foreground font-mono text-xs">{vehicle.id}</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="font-semibold text-foreground">Alerts Summary</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Unresolved</span>
                <span className="text-status-critical font-bold">{alerts.filter(a => !a.resolved).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Critical</span>
                <span className="text-orange-400 font-bold">{alerts.filter(a => a.severity === 'critical').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total</span>
                <span className="text-foreground font-bold">{alerts.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Predictions Section */}
      {predictionLoading ? (
        <Card>Loading predictions...</Card>
      ) : prediction ? (
        <PredictionPanel prediction={prediction} />
      ) : null}

      {/* Alerts Section */}
      {alertsLoading ? (
        <Card>Loading alerts...</Card>
      ) : (
        <AlertTimeline alerts={alerts} />
      )}
    </div>
  );
}
