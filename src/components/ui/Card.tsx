import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-[20px] transition-all duration-200 overflow-hidden',
        glass 
          ? 'apple-glass border border-white/20 dark:border-white/10' 
          : 'bg-white dark:bg-[#1C1C1E] border border-neutral-200/70 dark:border-[#2C2C2E]',
        hoverable && 'hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-0.5 cursor-pointer',
        'shadow-xs dark:shadow-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('px-6 pt-6 pb-2 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={cn('text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('p-6 pt-3', className)} {...props}>
    {children}
  </div>
);
