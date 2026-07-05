import { Vehicle, VehicleStatus, FleetStats } from '@/types/vehicle';
import { Prediction, FailureRisk } from '@/types/prediction';
import { Alert, AlertSeverity, AlertType } from '@/types/alert';
import { SensorData, SensorType, SensorReading } from '@/types/sensor';
import { Message, MessageRole, ChatSession } from '@/types/chat';
import { AnalyticsData, TrendData, DistributionData } from '@/types/analytics';

// Mock vehicles data - Tata Motors Fleet
export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'VH-001',
    vin: 'TATA0001TX9E123456',
    make: 'Tata',
    model: 'Nexon EV',
    year: 2024,
    licensePlate: 'TN-EV-001',
    status: VehicleStatus.HEALTHY,
    mileage: 15240,
    lastSeen: new Date(Date.now() - 2 * 60000),
    location: { latitude: 28.6139, longitude: 77.2090, address: 'New Delhi, India' },
    healthScore: 95,
    healthMetrics: {
      batteryHealth: 98,
      engineHealth: 100,
      transmissionHealth: 100,
      brakeSystemHealth: 96,
      electricalHealth: 92,
      chassisHealth: 95,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60000),
  },
  {
    id: 'VH-002',
    vin: 'TATA0002TX9E123457',
    make: 'Tata',
    model: 'Punch EV',
    year: 2023,
    licensePlate: 'TN-EV-002',
    status: VehicleStatus.DEGRADING,
    mileage: 42150,
    lastSeen: new Date(Date.now() - 5 * 60000),
    location: { latitude: 19.0760, longitude: 72.8777, address: 'Mumbai, India' },
    healthScore: 72,
    healthMetrics: {
      batteryHealth: 68,
      engineHealth: 75,
      transmissionHealth: 70,
      brakeSystemHealth: 85,
      electricalHealth: 65,
      chassisHealth: 72,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60000),
  },
  {
    id: 'VH-003',
    vin: 'TATA0003TX9E123458',
    make: 'Tata',
    model: 'Curvv EV',
    year: 2023,
    licensePlate: 'TN-EV-003',
    status: VehicleStatus.WARNING,
    mileage: 28450,
    lastSeen: new Date(Date.now() - 10 * 60000),
    location: { latitude: 23.1815, longitude: 79.9864, address: 'Indore, India' },
    healthScore: 65,
    healthMetrics: {
      batteryHealth: 62,
      engineHealth: 68,
      transmissionHealth: 64,
      brakeSystemHealth: 72,
      electricalHealth: 58,
      chassisHealth: 62,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 20 * 24 * 60 * 60000),
  },
  {
    id: 'VH-004',
    vin: 'TATA0004TX9E123459',
    make: 'Tata',
    model: 'Tigor EV',
    year: 2022,
    licensePlate: 'TN-EV-004',
    status: VehicleStatus.CRITICAL,
    mileage: 58920,
    lastSeen: new Date(Date.now() - 1 * 60000),
    location: { latitude: 12.9716, longitude: 77.5946, address: 'Bangalore, India' },
    healthScore: 35,
    healthMetrics: {
      batteryHealth: 28,
      engineHealth: 45,
      transmissionHealth: 38,
      brakeSystemHealth: 42,
      electricalHealth: 32,
      chassisHealth: 35,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60000),
    maintenanceDate: new Date(Date.now() + 2 * 24 * 60 * 60000),
  },
  {
    id: 'VH-005',
    vin: 'TATA0005TX9E123460',
    make: 'Tata',
    model: 'Harrier EV',
    year: 2023,
    licensePlate: 'TN-EV-005',
    status: VehicleStatus.MAINTENANCE,
    mileage: 35600,
    lastSeen: new Date(Date.now() - 15 * 60000),
    location: { latitude: 13.0827, longitude: 80.2707, address: 'Chennai, India' },
    healthScore: 50,
    healthMetrics: {
      batteryHealth: 48,
      engineHealth: 52,
      transmissionHealth: 50,
      brakeSystemHealth: 54,
      electricalHealth: 48,
      chassisHealth: 49,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 60 * 24 * 60 * 60000),
    maintenanceDate: new Date(),
  },
  {
    id: 'VH-006',
    vin: 'TATA0006TX9E123461',
    make: 'Tata',
    model: 'Ace EV',
    year: 2023,
    licensePlate: 'TN-EV-006',
    status: VehicleStatus.HEALTHY,
    mileage: 12340,
    lastSeen: new Date(Date.now() - 3 * 60000),
    location: { latitude: 15.2993, longitude: 75.8245, address: 'Hubballi, India' },
    healthScore: 92,
    healthMetrics: {
      batteryHealth: 94,
      engineHealth: 95,
      transmissionHealth: 92,
      brakeSystemHealth: 91,
      electricalHealth: 89,
      chassisHealth: 90,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 25 * 24 * 60 * 60000),
  },
  {
    id: 'VH-007',
    vin: 'TATA0007TX9E123462',
    make: 'Tata',
    model: 'Prima',
    year: 2023,
    licensePlate: 'TN-COM-007',
    status: VehicleStatus.HEALTHY,
    mileage: 82500,
    lastSeen: new Date(Date.now() - 4 * 60000),
    location: { latitude: 17.3850, longitude: 78.4867, address: 'Hyderabad, India' },
    healthScore: 88,
    healthMetrics: {
      batteryHealth: 90,
      engineHealth: 88,
      transmissionHealth: 86,
      brakeSystemHealth: 89,
      electricalHealth: 85,
      chassisHealth: 87,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 35 * 24 * 60 * 60000),
  },
  {
    id: 'VH-008',
    vin: 'TATA0008TX9E123463',
    make: 'Tata',
    model: 'Signa',
    year: 2023,
    licensePlate: 'TN-COM-008',
    status: VehicleStatus.DEGRADING,
    mileage: 95200,
    lastSeen: new Date(Date.now() - 6 * 60000),
    location: { latitude: 19.0760, longitude: 72.8777, address: 'Mumbai, India' },
    healthScore: 68,
    healthMetrics: {
      batteryHealth: 65,
      engineHealth: 70,
      transmissionHealth: 68,
      brakeSystemHealth: 72,
      electricalHealth: 62,
      chassisHealth: 67,
    },
    owner: 'Tata Motors Fleet',
    gpsTracking: true,
    lastMaintenance: new Date(Date.now() - 48 * 24 * 60 * 60000),
  },
];

// Fleet stats
export const generateFleetStats = (vehicles: Vehicle[] = MOCK_VEHICLES): FleetStats => {
  return {
    totalVehicles: vehicles.length,
    healthyVehicles: vehicles.filter(v => v.status === VehicleStatus.HEALTHY).length,
    degradingVehicles: vehicles.filter(v => v.status === VehicleStatus.DEGRADING).length,
    warningVehicles: vehicles.filter(v => v.status === VehicleStatus.WARNING).length,
    criticalVehicles: vehicles.filter(v => v.status === VehicleStatus.CRITICAL).length,
    averageHealthScore: Math.round(
      vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length
    ),
    maintenanceDue: vehicles.filter(
      v => v.status === VehicleStatus.MAINTENANCE || v.maintenanceDate && new Date(v.maintenanceDate) <= new Date()
    ).length,
  };
};

// Mock sensor data
export const generateSensorData = (vehicleId: string): SensorData => {
  const readings: SensorReading[] = [
    {
      sensorId: `${vehicleId}-TEMP-01`,
      type: SensorType.TEMPERATURE,
      value: Math.random() * 40 + 20,
      unit: '°C',
      timestamp: new Date(),
      isAnomalous: false,
    },
    {
      sensorId: `${vehicleId}-VOLT-01`,
      type: SensorType.VOLTAGE,
      value: Math.random() * 50 + 350,
      unit: 'V',
      timestamp: new Date(),
      isAnomalous: false,
    },
    {
      sensorId: `${vehicleId}-CURR-01`,
      type: SensorType.CURRENT,
      value: Math.random() * 100 + 50,
      unit: 'A',
      timestamp: new Date(),
      isAnomalous: false,
    },
    {
      sensorId: `${vehicleId}-SPEED-01`,
      type: SensorType.SPEED,
      value: Math.random() * 120,
      unit: 'km/h',
      timestamp: new Date(),
      isAnomalous: false,
    },
    {
      sensorId: `${vehicleId}-SOC-01`,
      type: SensorType.BATTERY_SOC,
      value: Math.random() * 100,
      unit: '%',
      timestamp: new Date(),
      isAnomalous: false,
    },
  ];

  return {
    vehicleId,
    readings,
    timestamp: new Date(),
    quality: 0.98,
  };
};

// Mock predictions
export const generatePrediction = (vehicleId: string): Prediction => {
  const failureRisks: FailureRisk[] = [
    {
      component: 'Battery',
      probability: Math.random() * 0.3,
      confidenceScore: 0.85 + Math.random() * 0.15,
      estimatedRUL: 365 + Math.random() * 365,
      riskLevel: 'low',
    },
    {
      component: 'Transmission',
      probability: Math.random() * 0.2,
      confidenceScore: 0.80 + Math.random() * 0.2,
      estimatedRUL: 450 + Math.random() * 300,
      riskLevel: 'low',
    },
    {
      component: 'Engine',
      probability: Math.random() * 0.25,
      confidenceScore: 0.82 + Math.random() * 0.18,
      estimatedRUL: 520 + Math.random() * 280,
      riskLevel: 'low',
    },
  ];

  return {
    id: `PRED-${vehicleId}-${Date.now()}`,
    vehicleId,
    timestamp: new Date(),
    failureRisks,
    overallRiskScore: Math.random() * 0.3,
    recommendedAction: 'Continue monitoring. Next service due in 3 months.',
    nextPredictionDue: new Date(Date.now() + 7 * 24 * 60 * 60000),
    modelVersion: '2.1.0',
  };
};

// Mock alerts
export const generateAlerts = (vehicleId: string): Alert[] => {
  const alertTypes = [
    { type: AlertType.MAINTENANCE_DUE, severity: AlertSeverity.INFO },
    { type: AlertType.BATTERY_LOW, severity: AlertSeverity.WARNING },
    { type: AlertType.PREDICTIVE_FAILURE, severity: AlertSeverity.CRITICAL },
  ];

  return alertTypes.map((alert, idx) => ({
    id: `ALERT-${vehicleId}-${idx}`,
    vehicleId,
    type: alert.type,
    severity: alert.severity,
    message: `${alert.type} on ${vehicleId}`,
    description: `Alert description for ${alert.type}`,
    timestamp: new Date(Date.now() - idx * 24 * 60 * 60000),
    resolved: idx > 0,
    resolvedAt: idx > 0 ? new Date(Date.now() - (idx - 1) * 24 * 60 * 60000) : undefined,
    component: 'Battery System',
    suggestedAction: 'Schedule maintenance appointment',
  }));
};

// Mock analytics data
export const generateAnalyticsData = (): AnalyticsData => {
  const generateTrendData = (days: number = 30): TrendData[] => {
    return Array.from({ length: days }, (_, i) => ({
      timestamp: new Date(Date.now() - (days - i) * 24 * 60 * 60000),
      value: Math.random() * 100 + 40,
      label: new Date(Date.now() - (days - i) * 24 * 60 * 60000).toLocaleDateString(),
    }));
  };

  return {
    fleetHealthTrend: generateTrendData(),
    failureDistribution: [
      { name: 'Battery', value: 35, percentage: 35 },
      { name: 'Transmission', value: 25, percentage: 25 },
      { name: 'Electrical', value: 20, percentage: 20 },
      { name: 'Mechanical', value: 20, percentage: 20 },
    ],
    batteryDegradation: generateTrendData(),
    engineHealth: generateTrendData(),
    rulTrend: generateTrendData(),
    alertsOverTime: generateTrendData(),
    maintenanceCost: generateTrendData().map(d => ({ ...d, value: Math.random() * 5000 + 1000 })),
    downtimeMetrics: generateTrendData().map(d => ({ ...d, value: Math.random() * 48 })),
    metrics: [
      { id: 'metric-1', name: 'Avg Fleet Health', value: 78, unit: '%', trend: 'stable', lastUpdated: new Date() },
      { id: 'metric-2', name: 'Critical Alerts', value: 3, trend: 'up', trendPercentage: 12, lastUpdated: new Date() },
      { id: 'metric-3', name: 'Maintenance Scheduled', value: 2, trend: 'down', trendPercentage: -8, lastUpdated: new Date() },
    ],
  };
};

// Mock chat messages
export const generateChatSession = (): ChatSession => {
  const messages: Message[] = [
    {
      id: 'msg-1',
      role: MessageRole.ASSISTANT,
      content: 'Hello! I\'m VitalCore AI Assistant. I can help you analyze vehicle health, predict maintenance needs, and optimize fleet operations. What would you like to know?',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: 'msg-2',
      role: MessageRole.USER,
      content: 'What\'s the status of vehicle VH-002?',
      timestamp: new Date(Date.now() - 4 * 60000),
    },
    {
      id: 'msg-3',
      role: MessageRole.ASSISTANT,
      content: 'Vehicle VH-002 (Tata Nexon EV) is currently showing a DEGRADING status with a health score of 72%. Battery health is at 68%, which is concerning. I recommend scheduling maintenance within the next week to prevent further degradation.',
      timestamp: new Date(Date.now() - 3 * 60000),
    },
  ];

  return {
    id: 'session-1',
    title: 'Fleet Health Analysis',
    messages,
    createdAt: new Date(Date.now() - 10 * 60000),
    updatedAt: new Date(Date.now() - 3 * 60000),
  };
};

export const SUGGESTED_CHAT_PROMPTS = [
  'Explain engine overheating',
  'Predict battery health',
  'Brake wear analysis',
  'Show vehicles needing maintenance',
  'Summarize fleet health',
  'What\'s the status of Tata Nexon EV?',
];
