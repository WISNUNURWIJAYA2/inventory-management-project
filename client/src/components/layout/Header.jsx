import React from 'react';
import {
  Menu,
  Warehouse,
  ChevronsUpDown,
  ChevronRight,
  Search,
  Plus,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header({ onQuickStockEntry, onToggleMobileSidebar }) {
  return (
    <header className="fixed top-0 left-0 lg:left-[240px] right-0 h-14 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30 z-40 flex items-center justify-between px-4 lg:px-6">
      {/* Left controls: Warehouse badge & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded text-outline hover:text-on-surface hover:bg-surface-container"
          type="button"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 border border-outline-variant/60 rounded px-2.5 py-1 bg-surface-container-low">
          <Warehouse className="w-4 h-4 text-outline" />
          <span className="text-xs text-on-surface font-medium">Main Warehouse - Branch #01</span>
          <ChevronsUpDown className="w-3.5 h-3.5 text-outline ml-0.5" />
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-outline text-xs">
          <span className="text-on-surface-variant font-medium">StockFlow</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface font-medium">Operational Console</span>
        </div>
      </div>

      {/* Right controls: Search, Quick Action, Notifications */}
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:flex items-center">
          <Search className="w-4 h-4 absolute left-2.5 text-outline" />
          <Input
            type="text"
            placeholder="Search SKU, product or lot (Ctrl+K)"
            className="w-64 pl-8 pr-10 text-xs h-8 bg-surface rounded border-outline-variant/80"
          />
          <kbd className="absolute right-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/60">
            ⌘K
          </kbd>
        </div>

        <Button
          size="sm"
          onClick={onQuickStockEntry}
          className="bg-primary text-on-primary hover:bg-primary-container h-8 px-3 rounded text-xs gap-1 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Stock Entry</span>
        </Button>

        <div className="relative">
          <button
            type="button"
            className="p-1.5 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest" />
          </button>
        </div>
      </div>
    </header>
  );
}

