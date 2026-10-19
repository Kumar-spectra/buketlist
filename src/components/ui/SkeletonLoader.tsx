import React from 'react';
import { cn } from '../../lib/utils';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-black/[0.06] dark:bg-white/[0.08]',
        className
      )}
    />
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Welcome header skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-9 w-72 rounded-xl" />
        <Skeleton className="h-4 w-96 rounded-full" />
      </div>

      {/* Summary metric cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-5 rounded-[20px] bg-white dark:bg-[#1C1C1E] border border-neutral-200/70 dark:border-[#2C2C2E] space-y-3">
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-lg" />
            <Skeleton className="h-2.5 w-16 rounded-full" />
          </div>
        ))}
      </div>

      {/* Spotlight card skeleton */}
      <div className="p-6 rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-neutral-200/70 dark:border-[#2C2C2E] flex flex-col md:flex-row gap-6">
        <Skeleton className="h-48 md:w-64 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-4 py-2">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-md" />
          <div className="pt-4 space-y-2">
            <Skeleton className="h-3 w-full rounded-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Two columns skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-[20px] bg-white dark:bg-[#1C1C1E] border border-neutral-200/70 dark:border-[#2C2C2E] space-y-4">
          <Skeleton className="h-5 w-40 rounded-lg" />
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3 items-center pt-2">
              <Skeleton className="w-5 h-5 rounded-md shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-[20px] bg-white dark:bg-[#1C1C1E] border border-neutral-200/70 dark:border-[#2C2C2E] space-y-4">
          <Skeleton className="h-5 w-40 rounded-lg" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
