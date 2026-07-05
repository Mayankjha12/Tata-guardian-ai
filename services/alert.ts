import { Alert, AlertTimeline } from '@/types/alert';
import { generateAlerts } from '@/utils/constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const alertService = {
  async getAlerts(vehicleId: string): Promise<Alert[]> {
    await delay(300);
    return generateAlerts(vehicleId);
  },

  async getAlertTimeline(vehicleId: string): Promise<AlertTimeline> {
    await delay(400);
    const alerts = generateAlerts(vehicleId);
    return {
      vehicleId,
      alerts,
      unresolvedCount: alerts.filter(a => !a.resolved).length,
      criticalCount: alerts.filter(a => a.severity === 'critical').length,
    };
  },

  async resolveAlert(alertId: string): Promise<Alert> {
    await delay(250);
    return {
      id: alertId,
      vehicleId: 'VH-001',
      type: 'maintenance_due',
      severity: 'warning',
      message: 'Alert resolved',
      description: 'This alert has been resolved',
      timestamp: new Date(),
      resolved: true,
      resolvedAt: new Date(),
      suggestedAction: 'None',
    } as Alert;
  },

  async dismissAlert(alertId: string): Promise<void> {
    await delay(150);
  },
};
