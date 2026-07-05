import { AnalyticsData, DateRange } from '@/types/analytics';
import { generateAnalyticsData } from '@/utils/constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyticsService = {
  async getAnalytics(dateRange?: DateRange): Promise<AnalyticsData> {
    await delay(600);
    return generateAnalyticsData();
  },

  async getFleetHealthTrend(days: number = 30): Promise<any[]> {
    await delay(400);
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60000).toLocaleDateString(),
      health: Math.random() * 50 + 50,
    }));
  },

  async getFailureDistribution(): Promise<any[]> {
    await delay(300);
    return [
      { name: 'Battery', value: 35 },
      { name: 'Transmission', value: 25 },
      { name: 'Electrical', value: 20 },
      { name: 'Mechanical', value: 20 },
    ];
  },

  async getBatteryDegradation(vehicleId?: string): Promise<any[]> {
    await delay(400);
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60000).toLocaleDateString(),
      capacity: Math.random() * 30 + 70,
    }));
  },

  async getMaintenanceCost(dateRange?: DateRange): Promise<any[]> {
    await delay(400);
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(Date.now() - (12 - i) * 30 * 24 * 60 * 60000).toLocaleDateString('default', { month: 'short' }),
      cost: Math.random() * 10000 + 5000,
    }));
  },

  async getDowntimeMetrics(): Promise<any[]> {
    await delay(400);
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60000).toLocaleDateString(),
      downtime: Math.random() * 24,
    }));
  },
};
