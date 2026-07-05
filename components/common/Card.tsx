'use client';

import { ReactNode } from 'react';
import { clsx } from '@/utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'accent';
  interactive?: boolean;
}

export function Card({
  children,
  className,
  variant = 'default',
  interactive = false,
}: CardProps) {
  const variantClass = {
    default: 'glass',
    subtle: 'glass-sm',
    accent: 'glass-lg glow-border',
  }[variant];

  return (
    <div
      className={clsx(
        variantClass,
        'rounded-xl p-6 transition-all duration-300',
        interactive && 'hover:shadow-lg cursor-pointer hover:border-primary/50',
        className
      )}
    >
      {children}
    </div>
  );
}
