import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatFriendlyDate } from '../lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Clock, 
  Bell, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Globe
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { reminders, toggleReminder, deleteReminder, openQuickAdd, userProfile } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 19)); // Oct 2026

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase 5 Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/25 border border-sky-200/60 dark:border-sky-900/40 text-xs">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Calendar & Reminders Preview
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1.5">
              • In-app agenda & calendar view active. Background notifications and recurrence engine arrive in Phase 5.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-500">
          <Globe className="w-3.5 h-3.5 text-[#007AFF]" />
          <span>{userProfile.timezone}</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Calendar & Reminders
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Dated goals, upcoming trip departures, savings targets, and tasks.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => openQuickAdd('reminder')}
          leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
        >
          Add Reminder
        </Button>
      </div>

      {/* Two-Column: Interactive Calendar Grid + Agenda List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar View (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {monthName}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-black/[0.05] dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-neutral-400 mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {blanksArray.map(b => (
                <div key={`blank-${b}`} className="aspect-square" />
              ))}
              {daysArray.map(day => {
                const isToday = day === 19; // Current sample date Oct 19
                const hasReminder = day === 20 || day === 25 || day === 31;
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all relative ${
                      isToday
                        ? 'bg-[#007AFF] text-white font-bold shadow-xs'
                        : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span>{day}</span>
                    {hasReminder && (
                      <span className={`w-1 h-1 rounded-full mt-0.5 ${isToday ? 'bg-white' : 'bg-[#007AFF]'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#007AFF]" /> Has scheduled reminder
              </span>
              <span>Timezone: {userProfile.timezone}</span>
            </div>
          </Card>
        </div>

        {/* Agenda / Task List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Agenda & Reminders</CardTitle>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {reminders.filter(r => !r.isCompleted).length} pending items
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {reminders.length === 0 ? (
                <EmptyState
                  icon={Bell}
                  title="No reminders"
                  description="Keep track of key dates by creating a reminder."
                  actionLabel="Add reminder"
                  onAction={() => openQuickAdd('reminder')}
                />
              ) : (
                <div className="space-y-2">
                  {reminders.map(rem => (
                    <div
                      key={rem.id}
                      className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        rem.isCompleted
                          ? 'bg-neutral-50/50 dark:bg-neutral-900/20 border-black/[0.03] dark:border-white/[0.04] opacity-60'
                          : 'bg-white dark:bg-[#1C1C1E] border-neutral-200/70 dark:border-neutral-800'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <button
                          onClick={() => toggleReminder(rem.id)}
                          className="mt-0.5 text-neutral-400 hover:text-emerald-500 transition-colors shrink-0"
                        >
                          {rem.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold ${rem.isCompleted ? 'line-through text-neutral-400' : 'text-neutral-900 dark:text-neutral-100'}`}>
                            {rem.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                            <Clock className="w-3 h-3" />
                            <span>{formatFriendlyDate(rem.dueAt)}</span>
                            {rem.relatedTitle && (
                              <span>• {rem.relatedTitle}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteReminder(rem.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                        title="Delete reminder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
