import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'purple' | 'gray' | 'red';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  size = 'md',
  className,
  dot = false,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium tracking-tight',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  const variantStyles = {
    blue: 'bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#0A84FF]/20 dark:text-[#52a6ff]',
    green: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    amber: 'bg-amber-500/10 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300',
    purple: 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
    gray: 'bg-neutral-500/10 text-neutral-600 dark:bg-neutral-400/15 dark:text-neutral-300',
    red: 'bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  };

  const dotColors = {
    blue: 'bg-[#007AFF] dark:bg-[#0A84FF]',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    gray: 'bg-neutral-400',
    red: 'bg-rose-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full select-none shrink-0',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])} />
      )}
      {children}
    </span>
  );
};
