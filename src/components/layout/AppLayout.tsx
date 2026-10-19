import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { QuickAddModal } from '../quick-add/QuickAddModal';
import { ToastContainer } from '../ui/ToastContainer';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC = () => {
  const { openQuickAdd } = useApp();

  // Global keyboard shortcuts (⌘K or N to open Quick Add)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openQuickAdd();
      } else if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        openQuickAdd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openQuickAdd]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#121214] text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row antialiased selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
      {/* Desktop Persistent Left Sidebar */}
      <Sidebar />

      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <Outlet />
        </div>
      </main>

      {/* Global Quick Add Dialog */}
      <QuickAddModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};
