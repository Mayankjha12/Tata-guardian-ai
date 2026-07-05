export interface FailureRisk {
  component: string;
  probability: number;
  confidenceScore: number;
  estimatedRUL: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface Prediction {
  id: string;
  vehicleId: string;
  timestamp: Date;
  failureRisks: FailureRisk[];
  overallRiskScore: number;
  recommendedAction: string;
  nextPredictionDue: Date;
  modelVersion: string;
}

export interface RULTrend {
  date: Date;
  rul: number;
  confidence: number;
}

export interface PredictionTrend {
  vehicleId: string;
  predictions: Prediction[];
  rulTrend: RULTrend[];
}
