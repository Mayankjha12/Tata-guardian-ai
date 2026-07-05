import { Prediction } from '@/types/prediction';
import { generatePrediction } from '@/utils/constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const predictionService = {
  async getPrediction(vehicleId: string): Promise<Prediction> {
    await delay(400);
    return generatePrediction(vehicleId);
  },

  async getPredictionHistory(vehicleId: string): Promise<Prediction[]> {
    await delay(500);
    return Array.from({ length: 10 }, (_, i) => ({
      ...generatePrediction(vehicleId),
      id: `PRED-${vehicleId}-${i}`,
      timestamp: new Date(Date.now() - i * 7 * 24 * 60 * 60000),
    }));
  },

  async runPrediction(vehicleId: string): Promise<Prediction> {
    await delay(800);
    return generatePrediction(vehicleId);
  },

  async getPredictionConfidence(vehicleId: string): Promise<number> {
    await delay(200);
    return 0.85 + Math.random() * 0.15;
  },
};
