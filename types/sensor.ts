export enum SensorType {
  TEMPERATURE = 'temperature',
  VOLTAGE = 'voltage',
  CURRENT = 'current',
  PRESSURE = 'pressure',
  VIBRATION = 'vibration',
  RPM = 'rpm',
  TORQUE = 'torque',
  SPEED = 'speed',
  BATTERY_SOC = 'battery_soc',
  BATTERY_TEMP = 'battery_temp',
  FAULT_CODE = 'fault_code',
}

export interface SensorReading {
  sensorId: string;
  type: SensorType;
  value: number;
  unit: string;
  timestamp: Date;
  isAnomalous: boolean;
}

export interface SensorData {
  vehicleId: string;
  readings: SensorReading[];
  timestamp: Date;
  quality: number;
}

export interface SensorHistory {
  sensorId: string;
  type: SensorType;
  readings: Array<{
    value: number;
    timestamp: Date;
  }>;
}
