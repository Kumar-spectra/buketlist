import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  Sun, 
  Moon, 
  Laptop, 
  Download, 
  RotateCcw, 
  Check, 
  Layers, 
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

export const SettingsPage: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    theme, 
    setTheme, 
    resetToSampleData,
    showToast,
    bucketItems,
    wishlistItems,
    trips,
    reminders,
    memories
  } = useApp();

  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [currency, setCurrency] = useState(userProfile.currency);
  const [timezone, setTimezone] = useState(userProfile.timezone);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      displayName: displayName.trim() || 'Alex Rivera',
      currency,
      timezone,
    });
  };

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      profile: userProfile,
      bucketItems,
      wishlistItems,
      trips,
      reminders,
      memories,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-life-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported your planner data as JSON', 'success');
  };

  const roadmapPhases = [
    { phase: 'Phase 1', title: 'Design Foundation & Shell', status: 'completed', desc: 'Tokens, responsive layout, sidebar, dashboard, quick add, and states.' },
    { phase: 'Phase 2', title: 'Bucket List & Supabase Auth', status: 'next', desc: 'PostgreSQL schema, RLS policies, and cloud persistence.' },
    { phase: 'Phase 3', title: 'Wishlist & Savings Ledger', status: 'planned', desc: 'Deposit/withdrawal transactions, balance derivation, and audit history.' },
    { phase: 'Phase 4', title: 'Travel & Food Planner', status: 'planned', desc: 'Itinerary stops, packing checklists, and structured meal logging.' },
    { phase: 'Phase 5', title: 'Calendar & Notifications', status: 'planned', desc: 'Timezone correctness, recurring reminders, and background delivery.' },
    { phase: 'Phase 6', title: 'Encrypted Photo Memories', status: 'planned', desc: 'Private Supabase storage buckets and authenticated signed URLs.' },
    { phase: 'Phase 7', title: 'QA & Production Release', status: 'planned', desc: 'Full automated testing, WCAG AA audits, and Vercel deployment.' },
  ];

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Preferences & Settings
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          Manage your personal profile, display currencies, themes, and data privacy.
        </p>
      </div>

      {/* Appearance Theme Selector */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Appearance & Theme</CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Choose an aesthetic that feels calm for day and night.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Light', desc: 'Clean off-white surfaces', icon: Sun, color: 'text-amber-500' },
              { id: 'dark', label: 'Dark', desc: 'Deep charcoal contrast', icon: Moon, color: 'text-indigo-400' },
              { id: 'system', label: 'System', desc: 'Syncs with macOS theme', icon: Laptop, color: 'text-[#007AFF]' },
            ].map(item => {
              const Icon = item.icon;
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id as any)}
                  className={cn(
                    'p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer',
                    isSelected
                      ? 'border-[#007AFF] bg-blue-50/40 dark:bg-blue-950/20 ring-1 ring-[#007AFF]'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={cn('w-5 h-5', item.color)} />
                    {isSelected && <Check className="w-4 h-4 text-[#007AFF]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Profile & Locales */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Profile & Regional Preferences</CardTitle>
            <p className="text-xs text-neutral-500 mt-0.5">
              Configured per Section 3 & 9 of the specification.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                >
                  <option value="INR">INR (₹ Indian Rupee)</option>
                  <option value="USD">USD ($ US Dollar)</option>
                  <option value="EUR">EUR (€ Euro)</option>
                  <option value="GBP">GBP (£ British Pound)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={e => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" variant="primary">
                Save Preferences
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Product Architecture Roadmap */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#007AFF]" />
            <div>
              <CardTitle>MVP Delivery Roadmap Status</CardTitle>
              <p className="text-xs text-neutral-500 mt-0.5">
                Full-stack phased implementation tracker from spec.md Section 13
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roadmapPhases.map((phaseItem, idx) => (
              <div
                key={phaseItem.phase}
                className={cn(
                  'p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors',
                  phaseItem.status === 'completed'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40'
                    : phaseItem.status === 'next'
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/60 dark:border-blue-900/40'
                    : 'bg-neutral-50/30 dark:bg-neutral-900/20 border-neutral-200/70 dark:border-neutral-800'
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-neutral-500 pt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {phaseItem.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {phaseItem.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {phaseItem.status === 'completed' ? (
                    <Badge variant="green" size="sm">
                      Phase 1 Ready
                    </Badge>
                  ) : phaseItem.status === 'next' ? (
                    <Badge variant="blue" size="sm" dot>
                      Next Phase
                    </Badge>
                  ) : (
                    <Badge variant="gray" size="sm">
                      Planned
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management & Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            <div>
              <CardTitle>Data Management & Local Privacy</CardTitle>
              <p className="text-xs text-neutral-500 mt-0.5">
                Your data currently lives privately in your browser's local storage.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Export Local JSON Backup
              </h4>
              <p className="text-xs text-neutral-500">
                Download all your bucket goals, savings, journeys, and memories.
              </p>
            </div>
            <Button
              variant="subtle"
              size="sm"
              onClick={handleExportData}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export JSON
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-50/40 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30">
            <div>
              <h4 className="text-sm font-semibold text-red-900 dark:text-red-200">
                Reset to Initial Sample Data
              </h4>
              <p className="text-xs text-red-600 dark:text-red-400">
                Clears any local modifications and restores the pristine Phase 1 sample dataset.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={resetToSampleData}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Reset Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
