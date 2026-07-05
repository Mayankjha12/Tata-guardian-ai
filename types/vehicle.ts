export enum VehicleStatus {
  HEALTHY = 'healthy',
  DEGRADING = 'degrading',
  WARNING = 'warning',
  CRITICAL = 'critical',
  MAINTENANCE = 'maintenance',
}

export interface HealthMetrics {
  batteryHealth: number;
  engineHealth: number;
  transmissionHealth: number;
  brakeSystemHealth: number;
  electricalHealth: number;
  chassisHealth: number;
}

export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: VehicleStatus;
  mileage: number;
  lastSeen: Date;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  healthMetrics: HealthMetrics;
  healthScore: number;
  maintenanceDate?: Date;
  owner: string;
  gpsTracking: boolean;
  lastMaintenance: Date;
}

export interface FleetStats {
  totalVehicles: number;
  healthyVehicles: number;
  degradingVehicles: number;
  warningVehicles: number;
  criticalVehicles: number;
  averageHealthScore: number;
  maintenanceDue: number;
}
