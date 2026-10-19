/**
 * Utility functions for Apple-grade typography, currency, and date formatting
 */

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency: 'INR' | 'USD' | 'EUR' | 'GBP' = 'INR'): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatFriendlyDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function calculateProgress(current: number, target: number): {
  percentage: number;
  remaining: number;
  isCompleted: boolean;
} {
  if (!target || target <= 0) {
    return { percentage: 0, remaining: 0, isCompleted: false };
  }
  
  const rawPercentage = (current / target) * 100;
  const percentage = Math.min(100, Math.max(0, Math.round(rawPercentage)));
  const remaining = Math.max(0, target - current);
  const isCompleted = current >= target;

  return { percentage, remaining, isCompleted };
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
