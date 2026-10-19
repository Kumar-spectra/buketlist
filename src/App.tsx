import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { BucketListPage } from './pages/BucketListPage';
import { SavingsPage } from './pages/SavingsPage';
import { TravelPage } from './pages/TravelPage';
import { HabitsPage } from './pages/HabitsPage';
import { CalendarPage } from './pages/CalendarPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="bucket-list" element={<BucketListPage />} />
            <Route path="savings" element={<SavingsPage />} />
            <Route path="travel" element={<TravelPage />} />
            <Route path="habits" element={<HabitsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="memories" element={<MemoriesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
