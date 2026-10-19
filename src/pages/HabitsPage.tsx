import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  UtensilsCrossed, 
  Plus, 
  Star, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  Circle, 
  Droplet, 
  Activity, 
  Layers 
} from 'lucide-react';

export const HabitsPage: React.FC = () => {
  const { 
    foodItems, 
    toggleFoodTried, 
    toggleFoodFavorite, 
    openQuickAdd, 
    userProfile,
    dailyWaterMl,
    setDailyWaterMl,
    dailyHabits,
    toggleDailyHabit
  } = useApp();

  const [filterTried, setFilterTried] = useState<'all' | 'tried' | 'to_try'>('all');

  const filteredFoods = foodItems.filter(f => {
    if (filterTried === 'tried') return f.tried;
    if (filterTried === 'to_try') return !f.tried;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase 4 Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/60 dark:border-amber-900/40 text-xs">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Food & Daily Habits Preview
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1.5">
              • Interactive daily habit streaks & food wishlist active. Structured meal logs and recipe attachments arrive in Phase 4.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-semibold text-[10px]">
          Phase 1 Interactive
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Food & Daily Habits
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Culinary spots to try, personal favourites, and your calm daily rhythm.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => openQuickAdd('food')}
          leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
        >
          Add Food / Place
        </Button>
      </div>

      {/* Daily Habits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Hydration Tracker */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-[#007AFF] flex items-center justify-center">
                  <Droplet className="w-4 h-4 fill-blue-500/20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Daily Water Intake
                  </h3>
                  <p className="text-xs text-neutral-500">Target: 3,000 ml</p>
                </div>
              </div>
              <Badge variant="blue" size="sm">
                {Math.round((dailyWaterMl / 3000) * 100)}%
              </Badge>
            </div>

            <div className="py-2">
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {dailyWaterMl} <span className="text-xs font-normal text-neutral-500">ml</span>
              </div>
              <div className="w-full bg-black/[0.05] dark:bg-white/[0.08] rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-[#007AFF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (dailyWaterMl / 3000) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-2 border-t border-black/[0.05] dark:border-white/[0.06]">
            <Button
              size="sm"
              variant="subtle"
              onClick={() => setDailyWaterMl(prev => Math.max(0, prev - 250))}
            >
              -250 ml
            </Button>
            <Button
              size="sm"
              variant="subtle"
              onClick={() => setDailyWaterMl(prev => prev + 250)}
            >
              +250 ml
            </Button>
            <Button
              size="sm"
              variant="subtle"
              onClick={() => setDailyWaterMl(prev => prev + 500)}
            >
              +500 ml Glass
            </Button>
          </div>
        </Card>

        {/* Daily Routine Habits */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Daily Rhythm & Mindfulness
                </h3>
                <p className="text-xs text-neutral-500">Tap to check off today's milestones</p>
              </div>
            </div>

            <div className="space-y-2 py-1">
              {Object.entries(dailyHabits).map(([habitName, isDone]) => (
                <div
                  key={habitName}
                  onClick={() => toggleDailyHabit(habitName)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.06] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <span className={`text-xs font-medium ${isDone ? 'line-through text-neutral-400' : 'text-neutral-800 dark:text-neutral-200'}`}>
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
          </div>
        </Card>
      </div>

      {/* Foods & Restaurants Wishlist */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Culinary Discoveries
            </h2>
            <p className="text-xs text-neutral-500">Dishes, bakeries, and cafes to experience</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl text-xs w-fit">
            <button
              onClick={() => setFilterTried('all')}
              className={`px-3 py-1 rounded-lg ${filterTried === 'all' ? 'bg-white dark:bg-neutral-800 font-semibold shadow-xs' : 'text-neutral-500'}`}
            >
              All ({foodItems.length})
            </button>
            <button
              onClick={() => setFilterTried('to_try')}
              className={`px-3 py-1 rounded-lg ${filterTried === 'to_try' ? 'bg-white dark:bg-neutral-800 font-semibold shadow-xs' : 'text-neutral-500'}`}
            >
              To Try ({foodItems.filter(f => !f.tried).length})
            </button>
            <button
              onClick={() => setFilterTried('tried')}
              className={`px-3 py-1 rounded-lg ${filterTried === 'tried' ? 'bg-white dark:bg-neutral-800 font-semibold shadow-xs' : 'text-neutral-500'}`}
            >
              Tried & Tested ({foodItems.filter(f => f.tried).length})
            </button>
          </div>
        </div>

        {filteredFoods.length === 0 ? (
          <EmptyState
            icon={UtensilsCrossed}
            title="No food spots found"
            description="Add dishes or cafes you wish to taste."
            actionLabel="Add food item"
            onAction={() => openQuickAdd('food')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredFoods.map(food => (
              <Card key={food.id} className="hoverable overflow-hidden flex flex-col justify-between">
                <div>
                  {food.imagePath && (
                    <div className="h-36 w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={food.imagePath}
                        alt={food.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <button
                        onClick={() => toggleFoodFavorite(food.id)}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white"
                        title="Toggle favorite"
                      >
                        <Heart className={`w-3.5 h-3.5 ${food.isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      </button>
                    </div>
                  )}

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={food.tried ? 'green' : 'amber'} size="sm">
                        {food.tried ? 'Tried' : 'To Try'}
                      </Badge>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{food.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                      {food.name}
                    </h4>

                    <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="truncate">{food.restaurantOrPlace}, {food.location}</span>
                    </div>

                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {food.notes}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(food.estimatedPrice, userProfile.currency)}
                  </span>
                  <button
                    onClick={() => toggleFoodTried(food.id)}
                    className="text-[#007AFF] hover:underline font-medium"
                  >
                    {food.tried ? 'Mark to try' : 'Mark tried'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
