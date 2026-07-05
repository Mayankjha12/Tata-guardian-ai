'use client';

import { Alert } from '@/types/alert';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { formatDateTime } from '@/utils/helpers';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertTimelineProps {
  alerts: Alert[];
}

export function AlertTimeline({ alerts }: AlertTimelineProps) {
  const unresolvedAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  return (
    <Card variant="default" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Alert Timeline</h2>
        {unresolvedAlerts.length > 0 && (
          <Badge>
            {unresolvedAlerts.length} Unresolved
          </Badge>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-status-healthy" />
          <p className="font-semibold">No alerts</p>
          <p className="text-sm">This vehicle is operating normally</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.resolved
                  ? 'bg-neutral-800/30 border-l-neutral-600'
                  : alert.severity === 'emergency'
                  ? 'bg-red-500/10 border-l-red-500'
                  : alert.severity === 'critical'
                  ? 'bg-orange-500/10 border-l-orange-500'
                  : alert.severity === 'warning'
                  ? 'bg-yellow-500/10 border-l-yellow-500'
                  : 'bg-blue-500/10 border-l-blue-500'
              } ${idx > 0 ? '' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  {alert.resolved ? (
                    <CheckCircle2 className="h-5 w-5 text-neutral-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-400" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">{alert.message}</p>
                    <Badge variant="severity" severity={alert.severity}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-sm text-neutral-400">{alert.description}</p>

                  {alert.component && (
                    <p className="text-xs text-neutral-500">Component: <span className="text-foreground">{alert.component}</span></p>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">{formatDateTime(alert.timestamp)}</p>
                    <p className="text-xs text-neutral-400">{alert.suggestedAction}</p>
                  </div>

                  {alert.resolved && alert.resolvedAt && (
                    <p className="text-xs text-neutral-500">Resolved at {formatDateTime(alert.resolvedAt)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
