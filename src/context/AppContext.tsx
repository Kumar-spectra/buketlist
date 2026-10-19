import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BucketItem, 
  WishlistItem, 
  Trip, 
  FoodItem, 
  Reminder, 
  Memory, 
  UserProfile, 
  QuickAddType 
} from '../types';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_BUCKET_ITEMS, 
  INITIAL_WISHLIST_ITEMS, 
  INITIAL_TRIPS, 
  INITIAL_FOOD_ITEMS, 
  INITIAL_REMINDERS, 
  INITIAL_MEMORIES 
} from '../lib/mockData';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Theme & Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isDarkMode: boolean;

  // Data Collections
  bucketItems: BucketItem[];
  wishlistItems: WishlistItem[];
  trips: Trip[];
  foodItems: FoodItem[];
  reminders: Reminder[];
  memories: Memory[];

  // Habit trackers
  dailyWaterMl: number;
  setDailyWaterMl: React.Dispatch<React.SetStateAction<number>>;
  dailyHabits: Record<string, boolean>;
  toggleDailyHabit: (habitName: string) => void;

  // Quick Add State & Actions
  isQuickAddOpen: boolean;
  quickAddType: QuickAddType;
  openQuickAdd: (type?: QuickAddType) => void;
  closeQuickAdd: () => void;

  // Real Mutations (Phase 1 Local State with immediate UI updates)
  addBucketItem: (item: Omit<BucketItem, 'id' | 'createdAt'>) => void;
  toggleBucketItemComplete: (id: string) => void;
  deleteBucketItem: (id: string) => void;

  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'createdAt' | 'savedAmount'>) => void;
  recordWishlistDeposit: (id: string, amount: number) => void;
  deleteWishlistItem: (id: string) => void;

  addTrip: (trip: Omit<Trip, 'id' | 'checklistCompleted' | 'checklistTotal' | 'itineraryStopsCount'>) => void;
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  toggleFoodTried: (id: string) => void;
  toggleFoodFavorite: (id: string) => void;

  addReminder: (reminder: Omit<Reminder, 'id' | 'isCompleted'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;

  addMemory: (memory: Omit<Memory, 'id'>) => void;
  deleteMemory: (id: string) => void;

  // Demo & Inspection Modes
  isSimulatedLoading: boolean;
  setIsSimulatedLoading: (loading: boolean) => void;
  isSimulatedEmpty: boolean;
  setIsSimulatedEmpty: (empty: boolean) => void;
  resetToSampleData: () => void;

  // Toast System
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('mylife_theme') as 'light' | 'dark' | 'system';
    return saved || 'light';
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('mylife_theme', theme);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = () => {
      const activeDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      setIsDarkMode(activeDark);
      if (activeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    showToast(`Theme updated to ${newTheme}`, 'info');
  };

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mylife_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const next = { ...prev, ...partial };
      localStorage.setItem('mylife_profile', JSON.stringify(next));
      return next;
    });
    showToast('Profile settings saved', 'success');
  };

  // Collections (stored in state initialized with sample data)
  const [bucketItems, setBucketItems] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('mylife_bucket_items');
    return saved ? JSON.parse(saved) : INITIAL_BUCKET_ITEMS;
  });

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('mylife_wishlist_items');
    return saved ? JSON.parse(saved) : INITIAL_WISHLIST_ITEMS;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('mylife_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('mylife_food_items');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('mylife_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('mylife_memories');
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  // Daily Habits
  const [dailyWaterMl, setDailyWaterMl] = useState<number>(2250);
  const [dailyHabits, setDailyHabits] = useState<Record<string, boolean>>({
    'Morning Meditation (15m)': true,
    'Read 20 pages': true,
    'Strength or Zone 2 Cardio': false,
    'No Screen 1hr Before Bed': false,
  });

  const toggleDailyHabit = (name: string) => {
    setDailyHabits(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('mylife_bucket_items', JSON.stringify(bucketItems));
  }, [bucketItems]);

  useEffect(() => {
    localStorage.setItem('mylife_wishlist_items', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('mylife_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('mylife_food_items', JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem('mylife_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('mylife_memories', JSON.stringify(memories));
  }, [memories]);

  // Quick Add state
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState<QuickAddType>('goal');

  const openQuickAdd = (type: QuickAddType = 'goal') => {
    setQuickAddType(type);
    setIsQuickAddOpen(true);
  };

  const closeQuickAdd = () => setIsQuickAddOpen(false);

  // Demo controls
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(false);
  const [isSimulatedEmpty, setIsSimulatedEmpty] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // CRUD Implementations
  const addBucketItem = (item: Omit<BucketItem, 'id' | 'createdAt'>) => {
    const newItem: BucketItem = {
      ...item,
      id: `b-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBucketItems(prev => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to Bucket List`, 'success');
  };

  const toggleBucketItemComplete = (id: string) => {
    setBucketItems(prev => prev.map(item => {
      if (item.id === id) {
        const isNowCompleted = item.status !== 'completed';
        return {
          ...item,
          status: isNowCompleted ? 'completed' : 'in_progress',
          completedAt: isNowCompleted ? new Date().toISOString() : undefined,
        };
      }
      return item;
    }));
    showToast('Updated goal status', 'info');
  };

  const deleteBucketItem = (id: string) => {
    setBucketItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed', 'info');
  };

  const addWishlistItem = (item: Omit<WishlistItem, 'id' | 'createdAt' | 'savedAmount'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: `w-${Date.now()}`,
      savedAmount: 0,
      createdAt: new Date().toISOString(),
    };
    setWishlistItems(prev => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to Wishlist`, 'success');
  };

  const recordWishlistDeposit = (id: string, amount: number) => {
    setWishlistItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextSaved = Math.max(0, item.savedAmount + amount);
        const nextStatus = nextSaved >= item.targetPrice ? 'ready' : 'saving';
        return {
          ...item,
          savedAmount: nextSaved,
          status: nextStatus,
        };
      }
      return item;
    }));
    showToast(amount >= 0 ? `Saved deposit recorded!` : `Withdrawal recorded`, 'success');
  };

  const deleteWishlistItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    showToast('Wishlist item removed', 'info');
  };

  const addTrip = (trip: Omit<Trip, 'id' | 'checklistCompleted' | 'checklistTotal' | 'itineraryStopsCount'>) => {
    const newTrip: Trip = {
      ...trip,
      id: `t-${Date.now()}`,
      checklistTotal: 5,
      checklistCompleted: 0,
      itineraryStopsCount: 3,
    };
    setTrips(prev => [newTrip, ...prev]);
    showToast(`Trip to ${newTrip.destination} added`, 'success');
  };

  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newFood: FoodItem = {
      ...item,
      id: `f-${Date.now()}`,
    };
    setFoodItems(prev => [newFood, ...prev]);
    showToast(`Added "${newFood.name}" to Food List`, 'success');
  };

  const toggleFoodTried = (id: string) => {
    setFoodItems(prev => prev.map(f => f.id === id ? { ...f, tried: !f.tried } : f));
  };

  const toggleFoodFavorite = (id: string) => {
    setFoodItems(prev => prev.map(f => f.id === id ? { ...f, isFavorite: !f.isFavorite } : f));
  };

  const addReminder = (rem: Omit<Reminder, 'id' | 'isCompleted'>) => {
    const newReminder: Reminder = {
      ...rem,
      id: `r-${Date.now()}`,
      isCompleted: false,
    };
    setReminders(prev => [newReminder, ...prev]);
    showToast(`Reminder created`, 'success');
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => {
      if (r.id === id) {
        const next = !r.isCompleted;
        return {
          ...r,
          isCompleted: next,
          completedAt: next ? new Date().toISOString() : undefined,
        };
      }
      return r;
    }));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    showToast('Reminder deleted', 'info');
  };

  const addMemory = (memory: Omit<Memory, 'id'>) => {
    const newMem: Memory = {
      ...memory,
      id: `m-${Date.now()}`,
    };
    setMemories(prev => [newMem, ...prev]);
    showToast(`Memory "${newMem.title}" saved`, 'success');
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    showToast('Memory removed', 'info');
  };

  const resetToSampleData = () => {
    setBucketItems(INITIAL_BUCKET_ITEMS);
    setWishlistItems(INITIAL_WISHLIST_ITEMS);
    setTrips(INITIAL_TRIPS);
    setFoodItems(INITIAL_FOOD_ITEMS);
    setReminders(INITIAL_REMINDERS);
    setMemories(INITIAL_MEMORIES);
    setUserProfile(INITIAL_USER_PROFILE);
    localStorage.clear();
    showToast('Reset to original sample data', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        theme,
        setTheme,
        isDarkMode,
        bucketItems: isSimulatedEmpty ? [] : bucketItems,
        wishlistItems: isSimulatedEmpty ? [] : wishlistItems,
        trips: isSimulatedEmpty ? [] : trips,
        foodItems: isSimulatedEmpty ? [] : foodItems,
        reminders: isSimulatedEmpty ? [] : reminders,
        memories: isSimulatedEmpty ? [] : memories,
        dailyWaterMl,
        setDailyWaterMl,
        dailyHabits,
        toggleDailyHabit,
        isQuickAddOpen,
        quickAddType,
        openQuickAdd,
        closeQuickAdd,
        addBucketItem,
        toggleBucketItemComplete,
        deleteBucketItem,
        addWishlistItem,
        recordWishlistDeposit,
        deleteWishlistItem,
        addTrip,
        addFoodItem,
        toggleFoodTried,
        toggleFoodFavorite,
        addReminder,
        toggleReminder,
        deleteReminder,
        addMemory,
        deleteMemory,
        isSimulatedLoading,
        setIsSimulatedLoading,
        isSimulatedEmpty,
        setIsSimulatedEmpty,
        resetToSampleData,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
