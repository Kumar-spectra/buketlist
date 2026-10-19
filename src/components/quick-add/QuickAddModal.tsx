import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { QuickAddType, BucketCategory, Priority } from '../../types';
import { Button } from '../ui/Button';
import { 
  X, 
  Target, 
  ShoppingBag, 
  Compass, 
  UtensilsCrossed, 
  Bell, 
  Camera 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const QuickAddModal: React.FC = () => {
  const { 
    isQuickAddOpen, 
    closeQuickAdd, 
    quickAddType, 
    openQuickAdd,
    addBucketItem,
    addWishlistItem,
    addTrip,
    addFoodItem,
    addReminder,
    addMemory
  } = useApp();

  const [activeTab, setActiveTab] = useState<QuickAddType>(quickAddType);

  // Sync tab with external caller
  useEffect(() => {
    setActiveTab(quickAddType);
  }, [quickAddType]);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Experiences');
  const [targetDate, setTargetDate] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [notes, setNotes] = useState('');
  const [country, setCountry] = useState('');
  const [place, setPlace] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickAdd();
    };
    if (isQuickAddOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isQuickAddOpen, closeQuickAdd]);

  if (!isQuickAddOpen) return null;

  const resetForm = () => {
    setTitle('');
    setCategory('Experiences');
    setTargetDate('');
    setEstimatedCost('');
    setPriority('medium');
    setNotes('');
    setCountry('');
    setPlace('');
    setImageUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (activeTab === 'goal') {
      addBucketItem({
        title: title.trim(),
        category: (category as BucketCategory) || 'Experiences',
        description: notes.trim() || 'A personal dream goal to achieve.',
        status: 'in_progress',
        priority,
        targetDate: targetDate || undefined,
        estimatedCost: estimatedCost ? Number(estimatedCost) : undefined,
        imagePath: imageUrl.trim() || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        notes: notes.trim(),
      });
    } else if (activeTab === 'wishlist') {
      addWishlistItem({
        title: title.trim(),
        category: category || 'General',
        targetPrice: Number(estimatedCost) || 10000,
        targetDate: targetDate || undefined,
        status: 'saving',
        productUrl: imageUrl.trim() || undefined,
        imagePath: imageUrl.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
        notes: notes.trim(),
      });
    } else if (activeTab === 'trip') {
      addTrip({
        destination: title.trim(),
        country: country.trim() || 'Worldwide',
        coverImage: imageUrl.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        startDate: targetDate || undefined,
        budget: Number(estimatedCost) || 50000,
        notes: notes.trim() || 'Exciting travel journey ahead.',
        status: 'planning',
      });
    } else if (activeTab === 'food') {
      addFoodItem({
        name: title.trim(),
        restaurantOrPlace: place.trim() || 'Local Specialty',
        location: country.trim() || 'City Center',
        estimatedPrice: Number(estimatedCost) || 500,
        rating: 5,
        notes: notes.trim(),
        tried: false,
        isFavorite: false,
        imagePath: imageUrl.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        category: 'dish',
      });
    } else if (activeTab === 'reminder') {
      addReminder({
        title: title.trim(),
        dueAt: targetDate ? new Date(targetDate).toISOString() : new Date().toISOString(),
        category: 'personal',
        priority,
        recurrence: 'none',
      });
    } else if (activeTab === 'memory') {
      addMemory({
        title: title.trim(),
        note: notes.trim() || 'A cherished personal experience.',
        photoUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        memoryDate: targetDate || new Date().toISOString().split('T')[0],
        rating: 5,
        tags: ['Moments', 'Life'],
      });
    }

    resetForm();
    closeQuickAdd();
  };

  const tabs = [
    { type: 'goal' as QuickAddType, label: 'Dream / Goal', icon: Target },
    { type: 'wishlist' as QuickAddType, label: 'Wishlist Item', icon: ShoppingBag },
    { type: 'trip' as QuickAddType, label: 'Trip', icon: Compass },
    { type: 'food' as QuickAddType, label: 'Food / Place', icon: UtensilsCrossed },
    { type: 'reminder' as QuickAddType, label: 'Reminder', icon: Bell },
    { type: 'memory' as QuickAddType, label: 'Memory', icon: Camera },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-[26px] bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.08]">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Quick Add
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Capture a thought in seconds • Organize the details later
            </p>
          </div>
          <button
            onClick={closeQuickAdd}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Segmented Control */}
        <div className="p-4 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-black/[0.05] dark:border-white/[0.06] overflow-x-auto">
          <div className="flex gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-800/80 rounded-2xl">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.type;
              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.type);
                    openQuickAdd(tab.type);
                  }}
                  className={cn(
                    'flex-1 min-w-[70px] py-1.5 px-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all select-none',
                    isActive
                      ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              {activeTab === 'trip' ? 'Destination name *' : activeTab === 'food' ? 'Food or Dish name *' : 'Title *'}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={
                activeTab === 'goal'
                  ? 'e.g. Scuba dive in Great Barrier Reef'
                  : activeTab === 'wishlist'
                  ? 'e.g. Sony WH-1000XM5 Headphones'
                  : activeTab === 'trip'
                  ? 'e.g. Amalfi Coast Roadtrip'
                  : activeTab === 'food'
                  ? 'e.g. Truffle Gnocchi'
                  : activeTab === 'reminder'
                  ? 'e.g. Transfer ₹10,000 to travel fund'
                  : 'e.g. Sunset hike with friends'
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-all"
            />
          </div>

          {/* Contextual fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeTab === 'goal' && (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                >
                  <option value="Experiences">Experiences</option>
                  <option value="Skills">Skills</option>
                  <option value="Travel">Travel</option>
                  <option value="Personal">Personal</option>
                  <option value="Career">Career</option>
                  <option value="Purchases">Purchases</option>
                </select>
              </div>
            )}

            {(activeTab === 'goal' || activeTab === 'wishlist' || activeTab === 'trip' || activeTab === 'food') && (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {activeTab === 'wishlist' ? 'Target Price (₹)' : activeTab === 'trip' ? 'Estimated Budget (₹)' : 'Estimated Cost (₹)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={estimatedCost}
                  onChange={e => setEstimatedCost(e.target.value)}
                  placeholder="e.g. 25000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            )}

            {(activeTab === 'goal' || activeTab === 'wishlist' || activeTab === 'trip' || activeTab === 'reminder' || activeTab === 'memory') && (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {activeTab === 'memory' ? 'Date Taken' : 'Target Date'}
                </label>
                <input
                  type={activeTab === 'reminder' ? 'datetime-local' : 'date'}
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            )}

            {activeTab === 'trip' && (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Country / Region
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="e.g. Italy, Norway, India"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            )}

            {activeTab === 'food' && (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Restaurant or Place
                </label>
                <input
                  type="text"
                  value={place}
                  onChange={e => setPlace(e.target.value)}
                  placeholder="e.g. Da Susy, Tokyo Central"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            )}

            {(activeTab === 'goal' || activeTab === 'reminder') && (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as Priority)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Notes or Inspiration
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add key thoughts, links, or context..."
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button type="button" variant="ghost" onClick={closeQuickAdd}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add to {tabs.find(t => t.type === activeTab)?.label.split(' ')[0]}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
