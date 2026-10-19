import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TripStatus } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { 
  Plane, 
  Plus, 
  MapPin, 
  CheckSquare, 
  Navigation, 
  Layers
} from 'lucide-react';

export const TravelPage: React.FC = () => {
  const { trips, openQuickAdd, userProfile } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses = [
    { id: 'All', label: 'All Journeys' },
    { id: 'dreaming', label: 'Dreaming' },
    { id: 'planning', label: 'Planning' },
    { id: 'booked', label: 'Booked' },
    { id: 'visited', label: 'Visited' },
  ];

  const filteredTrips = trips.filter(trip => 
    selectedStatus === 'All' || trip.status === selectedStatus
  );

  const statusVariants: Record<TripStatus, 'blue' | 'green' | 'amber' | 'purple'> = {
    planning: 'blue',
    visited: 'green',
    booked: 'purple',
    dreaming: 'amber',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase 4 Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-200/60 dark:border-purple-900/40 text-xs">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Travel Planner Preview
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1.5">
              • Trip cards & budget preview active. Interactive drag-and-drop itinerary stops & packing checklists scheduled for Phase 4.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold text-[10px]">
          Phase 1 Interactive
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Travel Planner
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Destinations, expedition itineraries, budgets, and packing checklists.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => openQuickAdd('trip')}
          leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
        >
          Plan a Trip
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl overflow-x-auto w-fit">
        {statuses.map(st => (
          <button
            key={st.id}
            onClick={() => setSelectedStatus(st.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedStatus === st.id
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <EmptyState
          icon={Plane}
          title="No travel journeys found"
          description="Plan your next great escape or document past explorations."
          actionLabel="Plan a trip"
          onAction={() => openQuickAdd('trip')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <Card key={trip.id} className="group hoverable overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-48 w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={trip.coverImage}
                    alt={trip.destination}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge variant={statusVariants[trip.status]} size="sm">
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-[#007AFF]" />
                    <span>{trip.country}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {trip.destination}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {trip.notes}
                  </p>

                  <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Dates</span>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {trip.startDate ? formatDate(trip.startDate) : 'Not scheduled'}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Budget</span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency(trip.budget, userProfile.currency)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-[#007AFF]" />
                      <span>{trip.itineraryStopsCount} stops</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{trip.checklistCompleted}/{trip.checklistTotal} checklist</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/50 dark:bg-neutral-900/20 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  {trip.status === 'visited' ? 'Completed Journey' : 'Planning in progress'}
                </span>
                <Button size="sm" variant="ghost">
                  View Stops
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
