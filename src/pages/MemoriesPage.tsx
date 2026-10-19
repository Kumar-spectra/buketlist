import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Memory } from '../types';
import { formatDate } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  Camera, 
  Plus, 
  Star, 
  Calendar, 
  Layers, 
  X, 
  Trash2, 
  Compass
} from 'lucide-react';

export const MemoriesPage: React.FC = () => {
  const { memories, deleteMemory, openQuickAdd } = useApp();
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase 6 Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/25 border border-rose-200/60 dark:border-rose-900/40 text-xs">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Photo Memories Preview
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1.5">
              • Editorial photo gallery active. Private Supabase authenticated encrypted storage buckets arrive in Phase 6.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-semibold text-[10px]">
          Phase 1 Interactive
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Life Memories
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Photos, notes, and milestones from completed lifetime experiences.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => openQuickAdd('memory')}
          leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
        >
          Capture Memory
        </Button>
      </div>

      {/* Memories Gallery Grid */}
      {memories.length === 0 ? (
        <EmptyState
          icon={Camera}
          title="No memories recorded yet"
          description="Capture moments as you complete dreams and explore the world."
          actionLabel="Capture a memory"
          onAction={() => openQuickAdd('memory')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map(mem => (
            <Card
              key={mem.id}
              onClick={() => setActiveMemory(mem)}
              className="group hoverable overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={mem.photoUrl}
                    alt={mem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                    {mem.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-semibold text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(mem.memoryDate)}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{mem.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {mem.title}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {mem.note}
                  </p>
                </div>
              </div>

              {(mem.relatedGoalTitle || mem.relatedTripTitle) && (
                <div className="px-5 py-2.5 border-t border-black/[0.04] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-neutral-900/30 text-[11px] text-neutral-500 truncate flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-[#007AFF] shrink-0" />
                  <span className="truncate">Linked to {mem.relatedTripTitle || mem.relatedGoalTitle}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Lightbox Detail Dialog */}
      {activeMemory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveMemory(null)}
        >
          <div 
            className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] overflow-hidden shadow-2xl animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={activeMemory.photoUrl}
                alt={activeMemory.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">
                    {formatDate(activeMemory.memoryDate)}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {activeMemory.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{activeMemory.rating}/5</span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {activeMemory.note}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeMemory.tags.map(t => (
                  <Badge key={t} variant="gray" size="sm">
                    #{t}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    deleteMemory(activeMemory.id);
                    setActiveMemory(null);
                  }}
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Delete Memory
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setActiveMemory(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
