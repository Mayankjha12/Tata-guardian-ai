export interface TrendData {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface DistributionData {
  name: string;
  value: number;
  percentage: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  timestamp?: Date;
}

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  lastUpdated: Date;
}

export interface AnalyticsData {
  fleetHealthTrend: TrendData[];
  failureDistribution: DistributionData[];
  batteryDegradation: TrendData[];
  engineHealth: TrendData[];
  rulTrend: TrendData[];
  alertsOverTime: TrendData[];
  maintenanceCost: TrendData[];
  downtimeMetrics: TrendData[];
  metrics: AnalyticsMetric[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
