import { SensorData } from '@/types/sensor';
import { generateSensorData } from '@/utils/constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sensorService = {
  async getSensorData(vehicleId: string): Promise<SensorData> {
    await delay(300);
    return generateSensorData(vehicleId);
  },

  async getSensorHistory(vehicleId: string, sensorType: string): Promise<SensorData[]> {
    await delay(400);
    return Array.from({ length: 24 }, (_, i) => ({
      ...generateSensorData(vehicleId),
      timestamp: new Date(Date.now() - i * 60 * 60000),
    }));
  },

  async getRealtimeSensorData(vehicleId: string): Promise<SensorData> {
    await delay(100);
    return generateSensorData(vehicleId);
  },
};
