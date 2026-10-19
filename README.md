# My Life — Life Bucket List & Personal Planner

A private, calm, Apple-inspired personal life planner designed to help you collect, plan, fund, experience, and remember the things that make life meaningful.

---

## Phase 1 Implementation Summary

Phase 1 focuses on establishing a **world-class design foundation**, responsive navigation, interactive dashboard, and polished component system with no dead buttons.

### ✨ What Has Been Built

1. **Apple-Inspired Design System (`src/index.css`)**:
   - **Light Theme**: Warm off-white background (`#F5F5F7`), crisp white surfaces, Apple system typography, and restrained blue accent (`#007AFF`).
   - **Dark Theme**: Deep charcoal backgrounds (`#121214`), elevated surfaces (`#1C1C1E`), high text contrast, and electric blue accent (`#0A84FF`).
   - **Theme Selector**: Full support for Light, Dark, and System preference with instant persistence and smooth 200ms transitions.

2. **Persistent Desktop & Mobile Navigation (`src/components/layout/`)**:
   - **Desktop**: Left persistent sidebar with space indicators, dynamic badges, Quick Add action with keyboard shortcut hint (`⌘K` / `N`), and footer profile with instant theme controls.
   - **Mobile**: Touch-friendly bottom tab navigation bar for the core destinations plus a smooth Apple slide-up drawer for additional spaces.

3. **Personalized Dashboard (`src/pages/DashboardPage.tsx`)**:
   - Dynamic time-aware greeting ("Good morning / evening, Alex") with timezone indicator.
   - High-value summary tiles: Active Dreams, Upcoming Plans, Total Saved (INR ₹), and Completed Milestones.
   - Featured Spotlight Wishlist / Savings Card with capped progress bar and remaining amount calculation.
   - Chronological Upcoming Milestones & Reminders with completion checkboxes.
   - Active Dreams highlights and editorial Recent Memories thumbnails.
   - Interactive Hydration tracker (`+ / - 250ml`) and daily mindfulness checklist.
   - **Visual Inspection Toolbar**: Interactive buttons to simulate Skeleton Loading states or Empty First-Use Onboarding states on the fly.

4. **Global Quick Add Modal (`src/components/quick-add/QuickAddModal.tsx`)**:
   - Segmented control to add **Dream/Goal**, **Wishlist Item**, **Trip**, **Food/Habit**, **Reminder**, or **Memory**.
   - Accessible via sidebar, mobile nav, or global keyboard shortcuts (`⌘K` or `N`).
   - Clean validation with progressive inputs and live toast notifications.
   - **Real local state persistence**: Items added immediately appear across the Dashboard, Bucket List, and Wishlist pages.

5. **Polished Foundation Pages**:
   - [Bucket List](file:///Users/kumarbabu/Desktop/my%20life/src/pages/BucketListPage.tsx): Category filters, status tabs (In Progress, Planned, Someday, Completed), search input, and completion toggles.
   - [Wishlist & Savings](file:///Users/kumarbabu/Desktop/my%20life/src/pages/SavingsPage.tsx): Visual funding progress bar, remaining cost calculation, and interactive deposit simulation modal.
   - [Travel Planner](file:///Users/kumarbabu/Desktop/my%20life/src/pages/TravelPage.tsx): Expedition cards, budget tracking, and status breakdown.
   - [Food & Habits](file:///Users/kumarbabu/Desktop/my%20life/src/pages/HabitsPage.tsx): Daily hydration tracker, mindfulness routines, and culinary discoveries wishlist.
   - [Calendar & Reminders](file:///Users/kumarbabu/Desktop/my%20life/src/pages/CalendarPage.tsx): Interactive monthly calendar grid, agenda checklist, and timezone display.
   - [Memories](file:///Users/kumarbabu/Desktop/my%20life/src/pages/MemoriesPage.tsx): Editorial photo gallery with lightbox detail preview.
   - [Settings](file:///Users/kumarbabu/Desktop/my%20life/src/pages/SettingsPage.tsx): User profile, currency selector (INR ₹, USD $, EUR €, GBP £), timezone selector, JSON data export, and complete MVP roadmap status.

---

## How to Run the Website Locally

### 1. Open Terminal and Navigate to Project
```bash
cd "/Users/kumarbabu/Desktop/my life"
```

### 2. Start the Vite Development Server
```bash
npm run dev
```

### 3. Open in Your Browser
Open your browser (Safari, Chrome, Arc, etc.) and go to:
```
http://localhost:5173/
```
*(or `http://127.0.0.1:5173/`)*

---

## Keyboard Shortcuts
- Press `N` or `⌘K` anywhere on desktop to open the **Quick Add** modal.
- Press `Esc` to close any modal or sheet.

---

## What Remains for Future Phases
As outlined in `spec.md`:
- **Phase 2**: Supabase setup, SQL database migrations, Row Level Security (RLS) policies, and cloud persistence for bucket items.
- **Phase 3**: Bank-grade transaction ledger for savings deposits, withdrawals, and purchase verification.
- **Phase 4**: Drag-and-drop itinerary stop reordering, packing checklist items, and structured meal logging.
- **Phase 5**: Notification delivery service, calendar recurrence rules, and timezone synchronization.
- **Phase 6**: Supabase authenticated private storage buckets for photo uploads.
- **Phase 7**: End-to-end testing, WCAG AA compliance verification, and production deployment on Vercel.
