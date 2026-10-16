import React from 'react';
import { Search, ChevronDown, FilterX, Lock, Calendar, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function TransactionsFilterToolbar({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  dateFilter,
  onDateFilterChange,
  staffFilter,
  onStaffFilterChange,
  onResetFilters,
  totalFiltered,
  totalOverall
}) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs border border-outline-variant/30 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-outline pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by Product, SKU, or PO reference..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded text-xs text-on-surface focus:bg-surface-container-lowest"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="px-3 py-1.5 pr-8 bg-surface-container-low border border-outline-variant/60 rounded text-xs font-medium text-on-surface focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Types</option>
              <option value="IN">Stock In</option>
              <option value="OUT">Stock Out</option>
              <option value="ADJUSTMENT">Adjustments</option>
              <option value="DISPOSAL">Damaged / Disposal</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-outline pointer-events-none" />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="px-3 py-1.5 pr-8 bg-surface-container-low border border-outline-variant/60 rounded text-xs font-medium text-on-surface focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">Last 7 Days (Oct 24 - Oct 31)</option>
              <option value="today">Today Only</option>
              <option value="month">This Month (October 2024)</option>
              <option value="custom">Custom Date Range...</option>
            </select>
            <Calendar className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-outline pointer-events-none" />
          </div>

          {/* Staff Filter */}
          <div className="relative">
            <select
              value={staffFilter}
              onChange={(e) => onStaffFilterChange(e.target.value)}
              className="px-3 py-1.5 pr-8 bg-surface-container-low border border-outline-variant/60 rounded text-xs font-medium text-on-surface focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Staff</option>
              <option value="Elena Vance">Elena Vance</option>
              <option value="Marcus Chen">Marcus Chen</option>
              <option value="Sarah Connor">Sarah Connor</option>
              <option value="David Miller">David Miller</option>
            </select>
            <User className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-outline pointer-events-none" />
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={onResetFilters}
            className="p-1.5 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Reset Filters"
          >
            <FilterX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Result Counter & Meta */}
      <div className="flex flex-wrap items-center justify-between text-on-surface-variant font-mono text-[11px] pt-1 border-t border-outline-variant/20 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>
            Showing <strong className="text-on-surface">{totalFiltered}</strong> of{' '}
            <strong className="text-on-surface">{totalOverall}</strong> logged ledger entries
          </span>
        </div>

        <div className="flex items-center gap-3 text-outline">
          <span className="hidden sm:inline">Audit Hash: ed70...4a19</span>
          <span className="text-tertiary flex items-center gap-1 font-medium">
            <Lock className="w-3 h-3" />
            <span>Ledger Immutable</span>
          </span>
        </div>
      </div>
    </div>
  );
}

