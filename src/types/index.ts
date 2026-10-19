export type Priority = 'low' | 'medium' | 'high';

export type BucketCategory = 
  | 'Experiences' 
  | 'Skills' 
  | 'Travel' 
  | 'Personal' 
  | 'Career' 
  | 'Purchases';

export type BucketStatus = 'someday' | 'planned' | 'in_progress' | 'completed';

export interface BucketItem {
  id: string;
  title: string;
  category: BucketCategory;
  description: string;
  status: BucketStatus;
  priority: Priority;
  targetDate?: string;
  estimatedCost?: number;
  imagePath?: string;
  url?: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

export type WishlistStatus = 'saving' | 'ready' | 'purchased';

export interface SavingsTransaction {
  id: string;
  bucketItemId: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  date: string;
  note?: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  category: string;
  targetPrice: number;
  savedAmount: number;
  targetDate?: string;
  status: WishlistStatus;
  productUrl?: string;
  imagePath?: string;
  notes?: string;
  createdAt: string;
  purchasedAt?: string;
}

export type TripStatus = 'dreaming' | 'planning' | 'booked' | 'visited';

export interface Trip {
  id: string;
  destination: string;
  country: string;
  coverImage: string;
  startDate?: string;
  endDate?: string;
  budget: number;
  spent?: number;
  notes: string;
  status: TripStatus;
  checklistTotal: number;
  checklistCompleted: number;
  itineraryStopsCount: number;
}

export interface FoodItem {
  id: string;
  name: string;
  restaurantOrPlace: string;
  location: string;
  estimatedPrice: number;
  rating: number;
  notes: string;
  tried: boolean;
  isFavorite: boolean;
  imagePath?: string;
  category: 'dish' | 'restaurant' | 'cafe' | 'recipe';
}

export interface DailyHabitLog {
  date: string;
  waterMl: number;
  habits: {
    [key: string]: boolean;
  };
}

export interface Reminder {
  id: string;
  title: string;
  dueAt: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  isCompleted: boolean;
  completedAt?: string;
  category: 'goal' | 'trip' | 'savings' | 'personal';
  relatedTitle?: string;
  priority: Priority;
}

export interface Memory {
  id: string;
  title: string;
  note: string;
  photoUrl: string;
  memoryDate: string;
  rating: number; // 1-5
  relatedGoalTitle?: string;
  relatedTripTitle?: string;
  tags: string[];
}

export interface UserProfile {
  displayName: string;
  email: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  timezone: string;
  theme: 'light' | 'dark' | 'system';
}

export type QuickAddType = 'goal' | 'wishlist' | 'trip' | 'food' | 'reminder' | 'memory';
