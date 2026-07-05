'use client';

import { ReactNode } from 'react';
import { VehicleStatus } from '@/types/vehicle';
import { AlertSeverity } from '@/types/alert';
import { getStatusColor, getStatusBgColor } from '@/utils/helpers';

interface BadgeProps {
  children: ReactNode;
  variant?: 'status' | 'severity' | 'default';
  status?: VehicleStatus;
  severity?: AlertSeverity | 'info' | 'warning' | 'critical' | 'emergency';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  status,
  severity,
  className = '',
}: BadgeProps) {
  let bgClass = 'bg-neutral-700 text-neutral-300';
  let textClass = 'text-neutral-300';

  if (variant === 'status' && status) {
    bgClass = getStatusBgColor(status);
    textClass = getStatusColor(status);
  } else if (variant === 'severity' && severity) {
    switch (severity) {
      case 'info':
      case AlertSeverity.INFO:
        bgClass = 'bg-blue-500/20';
        textClass = 'text-blue-400';
        break;
      case 'warning':
      case AlertSeverity.WARNING:
        bgClass = 'bg-yellow-500/20';
        textClass = 'text-yellow-400';
        break;
      case 'critical':
      case AlertSeverity.CRITICAL:
        bgClass = 'bg-orange-500/20';
        textClass = 'text-orange-400';
        break;
      case 'emergency':
      case AlertSeverity.EMERGENCY:
        bgClass = 'bg-red-500/20';
        textClass = 'text-red-500';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bgClass} ${textClass} ${className}`}
    >
      {children}
    </span>
  );
}
