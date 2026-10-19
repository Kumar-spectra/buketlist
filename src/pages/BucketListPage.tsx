import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BucketStatus } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  Target, 
  Plus, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Database,
  Trash2
} from 'lucide-react';

export const BucketListPage: React.FC = () => {
  const { 
    bucketItems, 
    toggleBucketItemComplete, 
    deleteBucketItem, 
    openQuickAdd, 
    userProfile 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Experiences', 'Skills', 'Travel', 'Personal', 'Career'];
  const statuses = [
    { id: 'All', label: 'All Items' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'planned', label: 'Planned' },
    { id: 'someday', label: 'Someday' },
    { id: 'completed', label: 'Completed' },
  ];

  const filteredItems = bucketItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Roadmap Callout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200/60 dark:border-blue-900/40 text-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-[#007AFF] shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Phase 1 Interactive Foundation
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1.5">
              • In-memory & local state preview. Cloud persistence with Supabase PostgreSQL & RLS arrives in Phase 2.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#007AFF] dark:text-blue-300 font-semibold text-[10px]">
          Phase 1 Active
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Life Bucket List
            </h1>
            <Badge variant="blue" size="md">
              {bucketItems.length} Dreams
            </Badge>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Experiences, skills, milestones, and meaningful lifetime pursuits.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => openQuickAdd('goal')}
          leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
        >
          Add New Dream
        </Button>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-3">
        {/* Search & Status Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status segmented control */}
          <div className="flex items-center gap-1 p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl overflow-x-auto">
            {statuses.map(st => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedStatus === st.id
                    ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search goals..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1E] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 font-medium shrink-0">Categories:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                  : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Bucket Cards */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals found"
          description={
            searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All'
              ? 'Try adjusting your filters or search term to see more items.'
              : 'Your bucket list is currently empty. Start by adding a lifelong dream.'
          }
          actionLabel="Add a new dream"
          onAction={() => openQuickAdd('goal')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const isDone = item.status === 'completed';
            const statusVariants: Record<BucketStatus, 'blue' | 'green' | 'amber' | 'gray'> = {
              in_progress: 'blue',
              completed: 'green',
              planned: 'amber',
              someday: 'gray',
            };

            return (
              <Card key={item.id} className="group flex flex-col justify-between hoverable">
                <div>
                  {/* Cover image if available */}
                  {item.imagePath && (
                    <div className="h-44 w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={item.imagePath}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <Badge variant={statusVariants[item.status]} size="sm">
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="gray" size="sm">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-2.5">
                    {!item.imagePath && (
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={statusVariants[item.status]} size="sm">
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="gray" size="sm">
                          {item.category}
                        </Badge>
                      </div>
                    )}

                    <h3 className={`text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 ${isDone ? 'line-through text-neutral-400 dark:text-neutral-500' : ''}`}>
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                      {item.targetDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{formatDate(item.targetDate)}</span>
                        </div>
                      )}
                      {item.estimatedCost && (
                        <div className="flex items-center gap-1 font-semibold text-neutral-700 dark:text-neutral-300">
                          <span>{formatCurrency(item.estimatedCost, userProfile.currency)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 py-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleBucketItemComplete(item.id)}
                    className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-500 fill-emerald-50' : 'text-neutral-400'}`} />
                    <span>{isDone ? 'Completed' : 'Mark Complete'}</span>
                  </button>

                  <button
                    onClick={() => deleteBucketItem(item.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
