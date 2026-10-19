import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
          info: <Info className="w-4 h-4 text-[#007AFF] dark:text-[#0A84FF] shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl',
              'bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/40',
              'border border-black/[0.08] dark:border-white/[0.12]',
              'text-sm font-medium text-neutral-800 dark:text-neutral-200 animate-in fade-in slide-in-from-bottom-2 duration-200'
            )}
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type]}
              <span>{toast.text}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors p-0.5 rounded-md"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
