export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
  EMERGENCY = 'emergency',
}

export enum AlertType {
  SENSOR_ANOMALY = 'sensor_anomaly',
  PERFORMANCE_DEGRADATION = 'performance_degradation',
  PREDICTIVE_FAILURE = 'predictive_failure',
  MAINTENANCE_DUE = 'maintenance_due',
  SAFETY_CONCERN = 'safety_concern',
  BATTERY_LOW = 'battery_low',
  TEMPERATURE_CRITICAL = 'temperature_critical',
  SYSTEM_ERROR = 'system_error',
}

export interface Alert {
  id: string;
  vehicleId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
  component?: string;
  suggestedAction: string;
}

export interface AlertTimeline {
  vehicleId: string;
  alerts: Alert[];
  unresolvedCount: number;
  criticalCount: number;
}
