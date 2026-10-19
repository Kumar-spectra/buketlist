MY LIFE
Life Bucket List & Personal Planner
Product Specification Document (PRD) — UI/UX-First Build
React + TypeScript + Supabase • UI/UX-first • Personal use
MY LIFE • Product Specification • Page 1
1. Product vision
Build a private, personal web app that helps one person collect, plan, fund, experience, and remember the things that make
life meaningful.
The app combines a bucket list, wishlist and savings tracker, travel planner, food journal, simple diet/habit tracker,
calendar/reminders, and photo memories.
North-star experience: adding a new dream should feel effortless; seeing progress should feel rewarding; the interface should
feel calm, premium, and trustworthy.
2. Product principles
• UI/UX quality comes first. Make the app feel designed, not assembled from generic admin-dashboard templates.
• Capture quickly, organize later. A global Quick Add action is available throughout the app.
• One coherent system. Shared card, form, status, date, money, image, and empty-state patterns across all sections.
• Calm by default. Avoid clutter, excessive color, unnecessary charts, noisy gradients, and overuse of animation.
• Real functionality only. No dead buttons, fake persistence, or features presented as working when they are not.
• Private by design. Personal records and photos must be protected by server-side authorization and Supabase RLS.
3. Target user and platform
Audience: one personal user initially. The architecture may support future expansion, but multi-user social features are out of
scope.
• Primary device: MacBook Air M2, desktop browser.
• Secondary device: mobile browser, with touch-friendly controls and layouts.
• Budget: prefer free tools and free-tier hosting/services; clearly identify any feature that requires paid infrastructure.
• Locale: default currency INR (■), configurable timezone, locale-aware date and currency formatting.
4. Information architecture
Desktop: persistent left sidebar, clear active state, compact brand area, global Quick Add button, profile/settings near the
bottom. Main content uses a readable max-width and generous whitespace.
Mobile: use a compact bottom navigation for the most important destinations plus a More menu, or a well-designed drawer if
it tests better. Never squeeze the desktop sidebar into a narrow screen.
5. UI/UX direction
Visual identity
• Design reference: Apple-style clarity and restraint—not a literal copy of Apple’s website or products.
Primary navigation Purpose
Dashboard Today’s overview, progress, upcoming items, recent memories
Bucket List Experiences, skills, milestones, and life goals
Wishlist & Savings Things to buy, target costs, savings transactions
Travel Destinations, trip plans, itineraries, packing checklists
Food & Habits Foods to try, favourites, meal logs, simple habit tracking
Calendar Dated goals, trips, milestones, reminders
Memories Photos and notes from completed experiences
Settings Profile, theme, currency/timezone, export and privacy
MY LIFE • Product Specification • Page 2
• Light theme: warm off-white page background (#F5F5F7), white surfaces, near-black text (#1D1D1F), subtle gray borders
(#E5E5EA), restrained blue accent (#007AFF).
• Dark theme: deep charcoal backgrounds, slightly lighter surfaces, carefully checked text contrast, the same restrained accent.
• Typography: native system font stack, using San Francisco on Apple platforms where available. Use a clear type scale and
avoid too many font weights.
• Spacing: consistent 8px-based scale. Generous spacing between sections; tighter spacing within related controls.
• Cards: restrained 14–20px corner radius, subtle borders, minimal shadows. Use elevation sparingly.
• Images: high-quality user photos for items, destinations, foods, and memories. Preserve consistent crop ratios and graceful
placeholders.
• Icons: consistent Lucide icons, normally paired with labels for navigation and actions.
Layout and hierarchy
• Each page begins with a clear title, short supporting description where useful, and one primary action.
• Use responsive grids: one column on small screens, two columns when appropriate on tablet, and flexible multi-column
layouts on desktop.
• Use a mix of editorial image cards for visual content and compact rows for tasks, transactions, and reminders.
• Use charts only when they answer a real question; prefer a progress bar and a clear amount for savings goals.
Interactions and polish
• Buttons, cards, menus, tabs, and form controls need hover, focus, pressed, disabled, loading, success, and error states as
applicable.
• Use restrained 150–200ms transitions; respect prefers-reduced-motion.
• Use optimistic UI only when rollback and error handling are implemented.
• Forms should have clear labels, inline validation, sensible defaults, keyboard support, and confirmation before destructive
actions.
• Provide skeletons or lightweight loading states, helpful empty states with a single next action, and recovery-oriented error
messages.
• Avoid excessive modal dialogs. Prefer a drawer or compact dialog for Quick Add; use full pages for complex trip editing.
6. Dashboard specification
The dashboard should answer: What matters to me? What is next? What am I saving for? What have I recently experienced?
• Welcome header with a short, calm message and a prominent Quick Add action.
• Summary tiles: active dreams, upcoming plans, total saved, and completed experiences. Do not show meaningless metrics.
• Featured goal/wishlist card with image, target amount/date, saved amount, remaining amount, and progress.
• Upcoming section showing the next few reminders, trips, and target dates, sorted chronologically.
• Recent memories section with image thumbnails and dates.
• Optional “Continue where you left off” section for active goals.
• First-use dashboard should show a friendly onboarding state and actions such as Add your first dream, Add a wishlist item, or
Plan a trip.
Dashboard should be personalized from real saved data. Any development seed data must be clearly identified and never
mixed into a real user’s records without consent.
7. Feature requirements
7.1 Bucket List
• Create, view, edit, archive/delete, and mark a goal complete.
• Fields: title, description, category, priority, status, target date, estimated cost, cover image, notes, created/completed
timestamps.
MY LIFE • Product Specification • Page 3
• Statuses: Someday, Planned, In Progress, Completed. Include filters, sorting, and search.
• Support categories such as experiences, skills, personal goals, career, purchases, and custom categories.
7.2 Wishlist & Savings
• Save item name, image, description, product URL, estimated price, priority, target purchase date, and status.
• Record deposits and withdrawals as individual transactions with amount, date, and optional note.
• Show target amount, net saved, remaining amount, and capped progress percentage.
• Derive balances from transactions rather than relying on a manually edited total.
• Support mark as purchased and optionally record actual purchase price/date.
7.3 Travel
• Save destination, cover image, date range, budget, notes, status, and checklist.
• Create ordered itinerary stops with date, title, notes, and optional cost.
• Statuses: Dreaming, Planning, Booked, Visited. Show trip progress and budget summary.
7.4 Food & Habits
• Save food name, image, restaurant/place, location, estimated price, rating, notes, and tried/favourite status.
• Provide simple daily meal logs with meal type, food, date/time, and optional notes.
• Allow lightweight habit tracking such as water, exercise, and custom habits. Avoid medical claims or prescriptive nutrition
advice.
7.5 Calendar & Reminders
• Calendar month view plus an accessible agenda/list view.
• Show goal deadlines, trip dates, savings milestones, and reminders with distinguishable but restrained visual labels.
• Create, edit, complete, snooze/reschedule, and optionally repeat reminders.
• Use explicit timezone handling and store timestamps consistently.
• Clearly distinguish in-app reminders from actual push/email notifications. Do not promise background delivery unless
implemented with a real delivery service.
7.6 Memories
• Save photos, title, date, notes, rating, and optional links to completed goals or trips.
• Gallery view with consistent image crops, accessible image previews, and a detail view.
• Support editing and deletion, including safe cleanup of associated storage objects.
7.7 Search, filters, and Quick Add
• Global Quick Add offers: Dream/Goal, Wishlist Item, Trip, Food, Reminder, Memory.
• Search by title and notes where appropriate; filter by status, category, priority, and date.
• Keep the first interaction short. Reveal advanced optional fields progressively.
8. Core user journeys
Journey A — Add a dream
Click Quick Add → choose Goal → enter title → optionally select category/priority/date → save → see the new item
immediately in the list and dashboard.
Journey B — Save for a purchase
Create wishlist item → enter target price → open savings panel → record a deposit → see remaining amount and progress
update → mark purchased when done.
MY LIFE • Product Specification • Page 4
Journey C — Plan a trip
Add destination → choose dates and budget → add itinerary stops and checklist → view trip in calendar → mark visited →
add photos to Memories.
Journey D — Remember an experience
Open Memories → add photo and short note → choose date and optional related goal/trip → save → see it in the gallery and
related detail page.
9. Data model
Use Supabase PostgreSQL with UUID primary keys, foreign keys, created_at/updated_at timestamps where appropriate,
constraints, indexes, and explicit ownership.
Table Important fields
profiles id (auth user id), display_name, currency, timezone, theme, created_at
bucket_items id, user_id, title, category, description, status, priority, target_date, estimated_cost,
image_path, url, metadata JSONB, created_at, updated_at, completed_at
savings_transactions id, user_id, bucket_item_id, amount, transaction_type, transaction_date, note,
created_at
trips id, user_id, bucket_item_id (optional unique link), start_date, end_date, budget,
notes, status, created_at, updated_at
trip_stops id, user_id, trip_id, name, visit_date, sort_order, notes, estimated_cost
reminders id, user_id, bucket_item_id (optional), title, due_at, recurrence, is_completed,
completed_at, created_at
memories id, user_id, bucket_item_id (optional), trip_id (optional), title, note, photo_path,
memory_date, rating, created_at
daily_logs id, user_id, log_date, meal_type, food_name, water_ml, exercise_note, habit_data
JSONB, created_at
Use JSONB only for optional or variable metadata, not for core fields that need filtering, constraints, or reporting. Use numeric
or integer minor units for money—not floating-point values.
Savings remaining = max(0, target − net savings). Progress percentage must safely handle missing/zero targets and be
capped visually at 100%. Decide and document how withdrawals affect net savings.
10. Security and privacy
• Use Supabase Auth for a private personal account.
• Enable Row Level Security on every table containing user-owned data. Policies must verify auth.uid() against the row owner.
• For child records, enforce ownership through trusted relationships and policies; never rely only on frontend checks.
• Never expose a service-role/secret key in browser code. Use only the intended publishable client key with RLS correctly
configured.
• Use a private Supabase Storage bucket for personal photos and authenticated access or short-lived signed URLs.
• Validate file size, file type, and upload errors; do not trust file extensions alone.
• Provide data export and account/data deletion flows, with clear warnings before destructive actions.
• Keep secrets out of Git and provide .env.example without real credentials.
11. Technical architecture
• Frontend: React + TypeScript + Vite.
• Routing: React Router.
• Styling: Tailwind CSS with reusable design tokens and accessible components.
• Backend/data: Supabase Auth, PostgreSQL, Storage, and RLS.
MY LIFE • Product Specification • Page 5
• Forms: React Hook Form + Zod.
• Icons: Lucide React.
• Calendar: choose a maintained React calendar library after checking mobile usability and bundle impact.
• Deployment: Vercel or Netlify for the frontend; Supabase for backend services.
• Keep feature logic in feature modules, reusable UI in shared components, and database access in typed service/helper
modules.
Suggested structure: src/app, src/components/ui, src/components/layout,
src/features/{bucket-list,savings,travel,food-diet,reminders,memories}, src/pages, src/lib, src/hooks, src/types,
supabase/migrations.
12. Accessibility and responsive acceptance
• All core actions work with keyboard navigation; focus indicators are visible.
• Every input has a label; icon-only buttons have accessible names.
• Text and controls meet WCAG AA contrast targets where applicable.
• Layout works at narrow mobile widths, tablet, and desktop without horizontal overflow.
• Touch targets are comfortable; avoid tiny action icons on mobile.
• Respect reduced-motion preferences and do not use color alone to communicate status.
• Forms explain validation errors and preserve entered values after recoverable errors.
13. MVP delivery plan
• Phase 1 — Design foundation: tokens, layout, navigation, responsive shell, dashboard, reusable cards/forms,
empty/loading/error states.
• Phase 2 — Core list: Supabase setup, SQL migrations, RLS, CRUD for bucket items, search/filter/sort.
• Phase 3 — Wishlist and savings: transaction history, calculations, progress, purchase state.
• Phase 4 — Travel and food: trip detail, itinerary, checklist, food collection and simple daily logs.
• Phase 5 — Calendar/reminders: date views, rescheduling, recurrence rules, timezone correctness; notification delivery only if
explicitly implemented.
• Phase 6 — Memories: private uploads, gallery/detail views, linking to trips/goals, safe deletion.
• Phase 7 — QA and deployment: accessibility, mobile layouts, security checks, production build, export/delete workflows,
setup documentation.
Recommended first release: finish Phases 1–3 before expanding. A polished, reliable smaller app is better than a large app
with incomplete features.
14. Definition of done
• No dead or misleading buttons; all visible actions work or are clearly marked as unavailable.
• Records persist after refresh and are correctly scoped to the signed-in user.
• CRUD, filters, empty states, loading states, validation, and errors work for each shipped feature.
• Savings balances and progress are correct for deposits, withdrawals, zero targets, and overfunding.
• Private photos cannot be accessed by unauthorized users.
• Calendar dates respect the configured timezone and do not shift unexpectedly.
• Responsive layout works on MacBook and mobile browsers.
• Production build and available automated checks pass.
• README explains setup, environment variables, migrations, RLS, storage policies, testing, deployment, and known
limitations.
MY LIFE • Product Specification • Page 6
15. Build instructions for the AI coding agent
Copy the following prompt into your coding agent after opening the project folder. The agent should read this specification
and implement one phase at a time.
You are a senior full-stack engineer and product designer. Follow the attached Life Bucket List UI/UX
Product Specification as the source of truth. UI/UX quality is the highest priority. First inspect the
existing files and report the current project state. Then implement Phase 1 only: create a premium,
Apple-inspired responsive design system, desktop sidebar/mobile navigation, dashboard, Quick Add
interaction, reusable components, and polished loading/empty/error states. Use React + TypeScript + Vite and
the selected styling setup. Use realistic sample data only for the visual prototype and label it as sample
data in code. Do not claim Supabase persistence or notifications exist until implemented. Keep components
modular and accessible. Run the available checks, fix errors, and explain how to launch and verify the app.
Do not proceed to the next phase until Phase 1 is working. Avoid generic admin-template styling, clutter,
dead buttons, and unnecessary dependencies.
16. Final product rule
The app should feel like a personal space you enjoy opening every day. Every screen should have a clear purpose, one
obvious next action, and enough visual calm to make planning feel motivating rather than like managing work. 