import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressBarProps {
  percentage: number;
  className?: string;
  barClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  className,
  barClassName,
  size = 'md',
  showLabel = false,
}) => {
  const cappedPercentage = Math.min(100, Math.max(0, Math.round(percentage || 0)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400 mb-1.5 font-medium">
          <span>Progress</span>
          <span>{cappedPercentage}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden p-0.5',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            cappedPercentage >= 100
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-[#007AFF] to-[#0A84FF]',
            barClassName
          )}
          style={{ width: `${cappedPercentage}%` }}
        />
      </div>
    </div>
  );
};
