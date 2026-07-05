'use client';

import { Prediction } from '@/types/prediction';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { AlertCircle, TrendingDown } from 'lucide-react';

interface PredictionPanelProps {
  prediction: Prediction;
}

export function PredictionPanel({ prediction }: PredictionPanelProps) {
  const riskScorePercent = (prediction.overallRiskScore * 100).toFixed(1);

  return (
    <Card variant="default" className="space-y-6">
      <h2 className="text-xl font-semibold">Predictive Analysis</h2>

      {/* Overall Risk Score */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-500">Overall Risk Score</span>
          <span className="text-xl font-bold text-accent-cyan">{riskScorePercent}%</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              prediction.overallRiskScore < 0.3
                ? 'bg-status-healthy'
                : prediction.overallRiskScore < 0.6
                ? 'bg-yellow-400'
                : 'bg-status-critical'
            }`}
            style={{ width: `${Math.min(prediction.overallRiskScore * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-neutral-400">{prediction.recommendedAction}</p>
      </div>

      {/* Component Risks */}
      <div className="space-y-3 border-t border-neutral-700 pt-6">
        <h3 className="text-sm font-semibold text-foreground">Component Failure Risks</h3>
        <div className="space-y-3">
          {prediction.failureRisks.map((risk, idx) => (
            <div key={idx} className="space-y-2 p-4 bg-neutral-800/50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{risk.component}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="severity"
                      severity={
                        risk.riskLevel === 'critical'
                          ? 'emergency'
                          : risk.riskLevel === 'high'
                          ? 'critical'
                          : risk.riskLevel === 'medium'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {risk.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-neutral-500">Probability</p>
                  <p className="font-semibold text-foreground">{(risk.probability * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-neutral-500">Confidence</p>
                  <p className="font-semibold text-accent-cyan">{(risk.confidenceScore * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-neutral-500">RUL (Days)</p>
                  <p className="font-semibold text-foreground">{Math.ceil(risk.estimatedRUL)}</p>
                </div>
              </div>

              <div className="w-full bg-neutral-900 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    risk.riskLevel === 'critical'
                      ? 'bg-status-critical'
                      : risk.riskLevel === 'high'
                      ? 'bg-orange-400'
                      : risk.riskLevel === 'medium'
                      ? 'bg-yellow-400'
                      : 'bg-status-healthy'
                  }`}
                  style={{ width: `${Math.min(risk.probability * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Info */}
      <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-lg text-xs text-neutral-400">
        <TrendingDown className="h-4 w-4" />
        <span>ML Model v{prediction.modelVersion}</span>
      </div>
    </Card>
  );
}
