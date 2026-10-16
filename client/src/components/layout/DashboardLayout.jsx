import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardLayout({ children, currentTab, onNavigate }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleQuickStockEntry = () => {
    if (onNavigate) {
      onNavigate('stock-transactions');
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentTab={currentTab} onNavigate={onNavigate} />
      </div>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="w-[240px] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              currentTab={currentTab}
              onNavigate={(tab) => {
                onNavigate(tab);
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onQuickStockEntry={handleQuickStockEntry}
      />

      {/* Main Content Area */}
      <div className="lg:pl-[240px]">
        <main className="pt-14 min-h-screen bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
