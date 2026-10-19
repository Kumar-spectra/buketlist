import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Target, 
  ShoppingBag, 
  Plane, 
  UtensilsCrossed, 
  Calendar as CalendarIcon, 
  Camera, 
  Settings, 
  Plus, 
  Sparkles,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const { 
    openQuickAdd, 
    userProfile, 
    theme, 
    setTheme, 
    bucketItems, 
    wishlistItems, 
    trips, 
    reminders 
  } = useApp();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: Compass, badge: null },
    { 
      to: '/bucket-list', 
      label: 'Bucket List', 
      icon: Target, 
      badge: bucketItems.filter(b => b.status === 'in_progress' || b.status === 'planned').length 
    },
    { 
      to: '/savings', 
      label: 'Wishlist & Savings', 
      icon: ShoppingBag, 
      badge: wishlistItems.filter(w => w.status === 'saving').length 
    },
    { 
      to: '/travel', 
      label: 'Travel Planner', 
      icon: Plane, 
      badge: trips.filter(t => t.status === 'planning').length 
    },
    { 
      to: '/habits', 
      label: 'Food & Habits', 
      icon: UtensilsCrossed, 
      badge: null 
    },
    { 
      to: '/calendar', 
      label: 'Calendar & Reminders', 
      icon: CalendarIcon, 
      badge: reminders.filter(r => !r.isCompleted).length 
    },
    { 
      to: '/memories', 
      label: 'Memories', 
      icon: Camera, 
      badge: null 
    },
    { 
      to: '/settings', 
      label: 'Settings', 
      icon: Settings, 
      badge: null 
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white/80 dark:bg-[#161618]/90 backdrop-blur-xl border-r border-black/[0.06] dark:border-white/[0.08] select-none z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-5 pb-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight leading-none mb-1">
              My Life
            </h1>
            <p className="text-[11px] font-medium text-neutral-400 dark:text-neutral-500 tracking-wide uppercase">
              Personal Planner
            </p>
          </div>
        </NavLink>
      </div>

      {/* Primary Quick Add Action */}
      <div className="px-4 pb-3">
        <button
          onClick={() => openQuickAdd('goal')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#007AFF] hover:bg-[#0062cc] dark:bg-[#0A84FF] dark:hover:bg-[#409cff] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Quick Add</span>
          <span className="ml-auto text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white/90">⌘K</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
          Spaces
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#0A84FF]/15 dark:text-[#52a6ff] font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-colors',
                        isActive
                          ? 'text-[#007AFF] dark:text-[#52a6ff]'
                          : 'text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge > 0 && (
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                        isActive
                          ? 'bg-[#007AFF] text-white dark:bg-[#0A84FF]'
                          : 'bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile & Theme Toggle */}
      <div className="p-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors">
          <NavLink to="/settings" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-semibold shadow-xs shrink-0">
              {userProfile.displayName.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {userProfile.displayName}
              </p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                Private Planner
              </p>
            </div>
          </NavLink>

          {/* Theme Quick Toggle */}
          <div className="flex items-center gap-0.5 bg-neutral-200/60 dark:bg-neutral-800 p-1 rounded-lg">
            <button
              onClick={() => setTheme('light')}
              title="Light theme"
              className={cn(
                'p-1 rounded-md transition-all',
                theme === 'light' ? 'bg-white dark:bg-neutral-700 text-amber-500 shadow-xs' : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title="Dark theme"
              className={cn(
                'p-1 rounded-md transition-all',
                theme === 'dark' ? 'bg-white dark:bg-neutral-700 text-indigo-400 shadow-xs' : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('system')}
              title="Match system"
              className={cn(
                'p-1 rounded-md transition-all',
                theme === 'system' ? 'bg-white dark:bg-neutral-700 text-[#007AFF] shadow-xs' : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
