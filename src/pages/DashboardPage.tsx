import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  formatCurrency, 
  formatDate, 
  formatFriendlyDate, 
  getGreeting, 
  calculateProgress 
} from '../lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { DashboardSkeleton } from '../components/ui/SkeletonLoader';
import { 
  Plus, 
  Target, 
  Calendar, 
  Wallet, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Sparkles,
  Plane,
  Layers,
  RefreshCw,
  EyeOff,
  Eye
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    userProfile, 
    bucketItems, 
    wishlistItems, 
    trips, 
    reminders, 
    memories,
    toggleReminder,
    openQuickAdd,
    isSimulatedLoading,
    setIsSimulatedLoading,
    isSimulatedEmpty,
    setIsSimulatedEmpty,
    resetToSampleData,
    dailyWaterMl,
    setDailyWaterMl,
    dailyHabits,
    toggleDailyHabit
  } = useApp();

  // If testing skeleton loading state
  if (isSimulatedLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
          <span className="text-xs font-medium text-neutral-500">Inspecting Skeleton Loading State</span>
          <Button size="sm" variant="secondary" onClick={() => setIsSimulatedLoading(false)}>
            Exit Loading State
          </Button>
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  // Calculate high-value summary metrics
  const activeDreamsCount = bucketItems.filter(b => b.status === 'in_progress' || b.status === 'planned').length;
  const upcomingPlansCount = trips.filter(t => t.status === 'planning' || t.status === 'booked').length;
  const completedExperiencesCount = bucketItems.filter(b => b.status === 'completed').length;
  
  // Total saved across wishlist
  const totalSaved = wishlistItems.reduce((acc, item) => acc + item.savedAmount, 0);
  const totalTargetWishlist = wishlistItems.reduce((acc, item) => acc + item.targetPrice, 0);

  // Featured Spotlight Wishlist Goal
  const featuredItem = wishlistItems.find(w => w.status === 'saving') || wishlistItems[0];
  const featuredProgress = featuredItem 
    ? calculateProgress(featuredItem.savedAmount, featuredItem.targetPrice)
    : null;

  // Active goals list (up to 3)
  const activeGoals = bucketItems.filter(b => b.status === 'in_progress').slice(0, 3);

  // Upcoming reminders & deadlines
  const upcomingReminders = reminders
    .filter(r => !r.isCompleted)
    .slice(0, 4);

  // Recent memories (up to 3)
  const recentMemories = memories.slice(0, 3);

  // Is entire dashboard empty?
  const isCompletelyEmpty = bucketItems.length === 0 && wishlistItems.length === 0 && trips.length === 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Visual Inspection Bar (Demo Controls) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] text-xs">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
          <Layers className="w-3.5 h-3.5 text-[#007AFF]" />
          <span className="font-medium text-neutral-700 dark:text-neutral-300">Phase 1 Design Preview</span>
          <span className="hidden sm:inline text-neutral-400">• Local state with live interaction</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSimulatedEmpty(!isSimulatedEmpty)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {isSimulatedEmpty ? <Eye className="w-3 h-3 text-emerald-500" /> : <EyeOff className="w-3 h-3" />}
            <span>{isSimulatedEmpty ? 'Restore Sample Data' : 'Test Empty State'}</span>
          </button>
          <button
            onClick={() => setIsSimulatedLoading(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span>Test Skeletons</span>
          </button>
          <button
            onClick={resetToSampleData}
            title="Reset to default seed data"
            className="p-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            <span>•</span>
            <span className="text-[#007AFF] dark:text-[#0A84FF]">{userProfile.timezone}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {getGreeting()}, {userProfile.displayName.split(' ')[0]}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Collect, fund, experience, and remember the things that matter.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            onClick={() => openQuickAdd('goal')}
            leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
          >
            Quick Add
          </Button>
        </div>
      </div>

      {/* If empty state triggered */}
      {isCompletelyEmpty ? (
        <EmptyState
          icon={Sparkles}
          title="Welcome to your personal Life Planner"
          description="Start building your life bucket list, track savings for your dream gear, and plan future journeys with complete privacy."
          actionLabel="Add your first dream"
          onAction={() => openQuickAdd('goal')}
          secondaryActionLabel="Plan a trip"
          onSecondaryAction={() => openQuickAdd('trip')}
        />
      ) : (
        <>
          {/* Summary Metric Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Active Dreams</span>
                <Target className="w-4 h-4 text-[#007AFF]" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {activeDreamsCount}
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
                Experiences & milestones
              </p>
            </Card>

            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Upcoming Plans</span>
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {upcomingPlansCount}
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
                Trips & target dates
              </p>
            </Card>

            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Saved</span>
                <Wallet className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {formatCurrency(totalSaved, userProfile.currency)}
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
                of {formatCurrency(totalTargetWishlist, userProfile.currency)} target
              </p>
            </Card>

            <Card className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500 mb-2">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Completed</span>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {completedExperiencesCount}
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
                Milestones achieved
              </p>
            </Card>
          </div>

          {/* Featured Spotlight Wishlist / Savings Card */}
          {featuredItem && featuredProgress && (
            <Card className="p-6 overflow-hidden relative border-neutral-200/80 dark:border-[#2C2C2E]">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 relative shadow-inner">
                  {featuredItem.imagePath ? (
                    <img
                      src={featuredItem.imagePath}
                      alt={featuredItem.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Wallet className="w-8 h-8 stroke-[1.5]" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="blue" size="sm">
                      Spotlight Goal
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Wishlist & Savings
                    </span>
                    {featuredItem.targetDate && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Target: {formatDate(featuredItem.targetDate)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {featuredItem.title}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {featuredItem.notes || 'Save consistently towards your target purchase.'}
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Saved: </span>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {formatCurrency(featuredItem.savedAmount, userProfile.currency)}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Remaining: </span>
                        <span className="font-medium text-neutral-700 dark:text-neutral-300">
                          {formatCurrency(featuredProgress.remaining, userProfile.currency)}
                        </span>
                      </div>
                    </div>
                    <ProgressBar percentage={featuredProgress.percentage} size="md" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {featuredProgress.percentage}% funded
                    </span>
                    <NavLink to="/savings">
                      <Button variant="subtle" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Wishlist
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (7 cols): Upcoming Milestones & Active Goals */}
            <div className="lg:col-span-7 space-y-6">
              {/* Upcoming Milestones & Reminders */}
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Upcoming Milestones & Reminders</CardTitle>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Sorted chronologically for your peace of mind
                    </p>
                  </div>
                  <NavLink to="/calendar">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View all
                    </Button>
                  </NavLink>
                </CardHeader>
                <CardContent>
                  {upcomingReminders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-400">
                      No upcoming reminders. All caught up!
                    </div>
                  ) : (
                    <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                      {upcomingReminders.map(reminder => (
                        <div
                          key={reminder.id}
                          className="py-3 flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              onClick={() => toggleReminder(reminder.id)}
                              className="text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors shrink-0"
                              title="Mark as completed"
                            >
                              {reminder.isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                                {reminder.title}
                              </p>
                              {reminder.relatedTitle && (
                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                                  Linked to {reminder.relatedTitle}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                              {formatFriendlyDate(reminder.dueAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Active Goals Highlights */}
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Active Life Bucket Goals</CardTitle>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Dreams currently in progress
                    </p>
                  </div>
                  <NavLink to="/bucket-list">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Explore
                    </Button>
                  </NavLink>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeGoals.map(goal => (
                    <NavLink
                      key={goal.id}
                      to="/bucket-list"
                      className="block p-3.5 rounded-xl border border-black/[0.05] dark:border-white/[0.08] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="blue" size="sm">
                              {goal.category}
                            </Badge>
                            {goal.targetDate && (
                              <span className="text-[11px] text-neutral-400">
                                Target: {formatDate(goal.targetDate)}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                            {goal.title}
                          </h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {goal.description}
                          </p>
                        </div>
                        {goal.estimatedCost && (
                          <div className="text-right shrink-0">
                            <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                              {formatCurrency(goal.estimatedCost, userProfile.currency)}
                            </span>
                          </div>
                        )}
                      </div>
                    </NavLink>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column (5 cols): Recent Memories & Daily Calm */}
            <div className="lg:col-span-5 space-y-6">
              {/* Recent Memories */}
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Recent Memories</CardTitle>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Captured moments & reflections
                    </p>
                  </div>
                  <NavLink to="/memories">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Gallery
                    </Button>
                  </NavLink>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2.5">
                    {recentMemories.map(mem => (
                      <NavLink
                        key={mem.id}
                        to="/memories"
                        className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 block shadow-xs"
                      >
                        <img
                          src={mem.photoUrl}
                          alt={mem.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white text-[10px]">
                          <span className="font-medium truncate">{mem.title}</span>
                          <span className="text-white/70">{formatDate(mem.memoryDate)}</span>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Calm & Habits Summary */}
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Today's Habits & Calm</CardTitle>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Lightweight daily rhythm
                    </p>
                  </div>
                  <NavLink to="/habits">
                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Details
                    </Button>
                  </NavLink>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Water intake tracker */}
                  <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                        Hydration: {dailyWaterMl} ml / 3000 ml
                      </span>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400">
                        Target 3 Liters daily
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setDailyWaterMl(prev => Math.max(0, prev - 250))}
                        className="w-7 h-7 rounded-lg bg-white dark:bg-neutral-800 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-xs font-bold text-neutral-700 dark:text-neutral-200"
                        title="Remove 250ml"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setDailyWaterMl(prev => prev + 250)}
                        className="w-7 h-7 rounded-lg bg-[#007AFF] text-white flex items-center justify-center text-xs font-bold shadow-xs active:scale-95"
                        title="Add 250ml"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Habit checklist */}
                  <div className="space-y-2">
                    {Object.entries(dailyHabits).map(([habitName, isDone]) => (
                      <div
                        key={habitName}
                        onClick={() => toggleDailyHabit(habitName)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
                      >
                        <span className={`text-xs font-medium ${isDone ? 'line-through text-neutral-400 dark:text-neutral-500' : 'text-neutral-700 dark:text-neutral-300'}`}>
                          {habitName}
                        </span>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Trip Preview */}
              {trips[0] && (
                <Card className="p-4 border-neutral-200/80 dark:border-[#2C2C2E]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <Plane className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        Next Expedition
                      </span>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                        {trips[0].destination}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {trips[0].startDate ? formatDate(trips[0].startDate) : 'Dates pending'} • {formatCurrency(trips[0].budget, userProfile.currency)}
                      </p>
                    </div>
                    <NavLink to="/travel">
                      <Button variant="subtle" size="sm">
                        Plan
                      </Button>
                    </NavLink>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
