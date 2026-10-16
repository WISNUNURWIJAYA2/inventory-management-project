import React from 'react';
import {
  LayoutGrid,
  Package,
  ArrowLeftRight,
  LogOut,
  Boxes
} from 'lucide-react';
import { currentUser } from '@/data/mockData';

export function Sidebar({ currentTab = 'dashboard', onNavigate }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'stock-transactions', label: 'Stock Transactions', icon: ArrowLeftRight },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col">
        {/* App Branding */}
        <div className="h-14 px-3 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary-container font-bold shadow-xs">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <span className="text-[15px] text-on-surface font-semibold tracking-tight">StockFlow</span>
          </div>
          <span className="text-[11px] font-mono bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded">
            v1.4
          </span>
        </div>

        {/* Section Label */}
        <div className="px-3 pt-3 pb-1">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Inventory Core
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="px-2 space-y-1 flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs rounded transition-colors text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Health Status & Profile */}
      <div className="flex flex-col border-t border-outline-variant/30 bg-surface-container-lowest">
        <div className="px-3 py-1.5 border-b border-outline-variant/20 flex items-center gap-2 text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="text-[11px] font-mono text-outline">DB Connected • 99.98%</span>
        </div>

        <div className="p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-outline-variant/40"
            />
            <div className="min-w-0 flex flex-col">
              <span className="text-xs text-on-surface truncate font-semibold">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-outline truncate">
                {currentUser.role}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="p-1.5 text-outline hover:text-error hover:bg-error-container/20 rounded transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

