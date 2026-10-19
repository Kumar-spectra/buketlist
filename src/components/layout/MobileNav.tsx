import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Target, 
  ShoppingBag, 
  Calendar, 
  Menu, 
  X, 
  Plane, 
  UtensilsCrossed, 
  Camera, 
  Settings, 
  Plus, 
  Sun, 
  Moon, 
  Laptop,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const MobileNav: React.FC = () => {
  const { openQuickAdd, theme, setTheme } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { to: '/', label: 'Dashboard', icon: Compass },
    { to: '/bucket-list', label: 'Dreams', icon: Target },
    { to: '/savings', label: 'Wishlist', icon: ShoppingBag },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
  ];

  const moreItems = [
    { to: '/travel', label: 'Travel Planner', icon: Plane, desc: 'Trips, itineraries, budgets' },
    { to: '/habits', label: 'Food & Habits', icon: UtensilsCrossed, desc: 'Places to try, daily habits' },
    { to: '/memories', label: 'Photo Memories', icon: Camera, desc: 'Cherished captured milestones' },
    { to: '/settings', label: 'Settings', icon: Settings, desc: 'Preferences, profile, themes' },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/85 dark:bg-[#161618]/85 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08]">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#007AFF] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4 fill-white/20" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
            My Life
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openQuickAdd('goal')}
            className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-[#007AFF] text-white text-xs font-semibold shadow-xs active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add</span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#161618]/90 backdrop-blur-xl border-t border-black/[0.08] dark:border-white/[0.08] px-2 py-1 safe-area-pb">
        <div className="flex items-center justify-around">
          {mainTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-[10px] font-medium transition-colors min-w-[56px]',
                    isActive
                      ? 'text-[#007AFF] dark:text-[#52a6ff]'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn('w-5 h-5 mb-0.5', isActive && 'stroke-[2.2]')} />
                    <span>{tab.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Sheet Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={cn(
              'flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-[10px] font-medium transition-colors min-w-[56px]',
              isMoreOpen
                ? 'text-[#007AFF] dark:text-[#52a6ff]'
                : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span>More</span>
          </button>
        </div>
      </nav>

      {/* "More" Slide-up Drawer for Mobile */}
      {isMoreOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMoreOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#1C1C1E] rounded-t-[28px] border-t border-black/[0.08] dark:border-white/[0.12] p-5 pb-8 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Additional Spaces
                </span>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              {moreItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 dark:bg-[#0A84FF]/20 flex items-center justify-center text-[#007AFF] dark:text-[#52a6ff] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {item.label}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {item.desc}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
            </div>

            {/* Theme switcher inside mobile sheet */}
            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Appearance
              </span>
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1',
                    theme === 'light' ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white' : 'text-neutral-400'
                  )}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1',
                    theme === 'dark' ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white' : 'text-neutral-400'
                  )}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1',
                    theme === 'system' ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white' : 'text-neutral-400'
                  )}
                >
                  <Laptop className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Auto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
