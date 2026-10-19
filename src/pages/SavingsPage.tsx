import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WishlistItem } from '../types';
import { formatCurrency, calculateProgress } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  ShoppingBag, 
  Plus, 
  Coins, 
  ExternalLink,
  Layers,
  X
} from 'lucide-react';

export const SavingsPage: React.FC = () => {
  const { 
    wishlistItems, 
    recordWishlistDeposit, 
    deleteWishlistItem, 
    openQuickAdd, 
    userProfile 
  } = useApp();

  // Deposit modal state
  const [selectedItemForDeposit, setSelectedItemForDeposit] = useState<WishlistItem | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('5000');

  const totalTarget = wishlistItems.reduce((acc, i) => acc + i.targetPrice, 0);
  const totalSaved = wishlistItems.reduce((acc, i) => acc + i.savedAmount, 0);
  const totalRemaining = Math.max(0, totalTarget - totalSaved);
  const overallProgress = calculateProgress(totalSaved, totalTarget);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForDeposit) return;
    const amount = Number(depositAmount);
    if (isNaN(amount) || amount === 0) return;
    recordWishlistDeposit(selectedItemForDeposit.id, amount);
    setSelectedItemForDeposit(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase 3 Roadmap Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Wishlist & Savings Preview
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1.5">
              • Interactive deposit calculator active. Dedicated transaction ledger & bank-grade audit tables scheduled for Phase 3.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
          Phase 1 Interactive
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Wishlist & Savings Tracker
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Fund the tools, gear, and purchases that elevate your daily life.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => openQuickAdd('wishlist')}
          leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
        >
          Add Wishlist Item
        </Button>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Net Saved</span>
          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
            {formatCurrency(totalSaved, userProfile.currency)}
          </div>
          <div className="mt-3">
            <ProgressBar percentage={overallProgress.percentage} size="sm" />
            <div className="flex justify-between items-center text-[11px] text-neutral-500 mt-1">
              <span>{overallProgress.percentage}% of total goal</span>
              <span>Target: {formatCurrency(totalTarget, userProfile.currency)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Remaining to Fund</span>
          <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
            {formatCurrency(totalRemaining, userProfile.currency)}
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            Across {wishlistItems.length} curated items
          </p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Ready to Purchase</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {wishlistItems.filter(i => i.status === 'ready').length} Items
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            100% savings goal achieved
          </p>
        </Card>
      </div>

      {/* Items List */}
      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No wishlist items yet"
          description="Create your first item to begin tracking your savings milestones."
          actionLabel="Add Wishlist Item"
          onAction={() => openQuickAdd('wishlist')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlistItems.map(item => {
            const { percentage, remaining, isCompleted } = calculateProgress(item.savedAmount, item.targetPrice);

            return (
              <Card key={item.id} className="flex flex-col justify-between hoverable overflow-hidden">
                <div>
                  {item.imagePath && (
                    <div className="h-44 w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={item.imagePath}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={isCompleted ? 'green' : 'blue'} size="sm">
                          {isCompleted ? 'Goal Achieved' : 'In Progress'}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </h3>
                      </div>
                      {item.productUrl && (
                        <a
                          href={item.productUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 hover:text-[#007AFF] transition-colors p-1"
                          title="Open product link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                      {item.notes || 'Save consistently towards this goal.'}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-baseline text-xs">
                        <div>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">
                            {formatCurrency(item.savedAmount, userProfile.currency)}
                          </span>
                          <span className="text-neutral-400 text-[11px]"> saved</span>
                        </div>
                        <span className="text-neutral-500 dark:text-neutral-400">
                          Target: {formatCurrency(item.targetPrice, userProfile.currency)}
                        </span>
                      </div>
                      <ProgressBar percentage={percentage} size="md" />
                      <div className="flex justify-between text-[11px] text-neutral-400">
                        <span>{percentage}% funded</span>
                        <span>{remaining > 0 ? `${formatCurrency(remaining, userProfile.currency)} left` : 'Fully funded'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action bar */}
                <div className="px-5 py-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="subtle"
                    onClick={() => setSelectedItemForDeposit(item)}
                    leftIcon={<Coins className="w-3.5 h-3.5 text-amber-500" />}
                  >
                    Record Deposit
                  </Button>

                  <button
                    onClick={() => deleteWishlistItem(item.id)}
                    className="text-xs text-neutral-400 hover:text-red-500 transition-colors p-1"
                  >
                    Remove
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Quick Deposit Simulation Dialog */}
      {selectedItemForDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] p-5 shadow-2xl animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Record Savings Deposit
                </h4>
                <p className="text-xs text-neutral-500 truncate max-w-[240px]">
                  {selectedItemForDeposit.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedItemForDeposit(null)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Deposit Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  autoFocus
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2">
                {[2000, 5000, 10000, 25000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setDepositAmount(val.toString())}
                    className="flex-1 py-1 px-2 rounded-lg text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition-colors"
                  >
                    +₹{val >= 1000 ? `${val / 1000}k` : val}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedItemForDeposit(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add to Savings
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
