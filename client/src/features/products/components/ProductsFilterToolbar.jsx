import React from 'react';
import { Search, X, ChevronDown, ScanBarcode } from 'lucide-react';
import { productCategories } from '@/data/productsMock';

export function ProductsFilterToolbar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  onResetFilters,
  totalFiltered,
  totalProducts,
  onOpenScanner
}) {
  const hasActiveFilters = searchQuery.trim() !== '' || categoryFilter !== 'all' || statusFilter !== 'all';

  const getStatusLabel = (val) => {
    switch (val) {
      case 'instock':
        return 'Status: In Stock';
      case 'lowstock':
        return 'Status: Low Stock & Depleted';
      case 'critical':
        return 'Status: Critical Low';
      case 'depleted':
        return 'Status: Out of Stock';
      default:
        return 'Status: All';
    }
  };

  return (
    <div className="bg-surface-container-lowest p-4 rounded-lg shadow-xs border border-outline-variant/30 flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search product name, SKU, or barcode..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-surface-container-low border border-outline-variant/60 rounded text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 bg-surface-container-low border border-outline-variant/60 rounded text-xs font-medium text-on-surface cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
            >
              {productCategories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
          </div>

          {/* Stock Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 bg-surface-container-low border border-outline-variant/60 rounded text-xs font-medium text-on-surface cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
            >
              <option value="all">Status: All</option>
              <option value="instock">In Stock</option>
              <option value="lowstock">Low Stock &amp; Depleted</option>
              <option value="critical">Critical Low</option>
              <option value="depleted">Out of Stock</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
          </div>

          {/* Barcode Quick HUD Scanner Button */}
          <button
            type="button"
            onClick={onOpenScanner}
            className="px-2.5 py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/60 rounded text-on-surface-variant flex items-center gap-1.5 font-mono text-[11px] transition-colors"
            title="Open Barcode Listener"
          >
            <ScanBarcode className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">HUD Scanner</span>
          </button>
        </div>
      </div>

      {/* Active Filter Pill Tags Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-outline-variant/20">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-outline font-semibold">Active filters:</span>

          {statusFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-medium">
              {getStatusLabel(statusFilter)}
              <button
                type="button"
                onClick={() => onStatusFilterChange('all')}
                className="hover:text-error ml-0.5 inline-flex items-center"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {categoryFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-medium">
              Category: {categoryFilter}
              <button
                type="button"
                onClick={() => onCategoryFilterChange('all')}
                className="hover:text-error ml-0.5 inline-flex items-center"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery.trim() !== '' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-medium">
              Query: &ldquo;{searchQuery}&rdquo;
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="hover:text-error ml-0.5 inline-flex items-center"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-[11px] text-primary hover:underline ml-1 font-semibold"
            >
              Clear all
            </button>
          )}

          {!hasActiveFilters && (
            <span className="text-[11px] text-outline font-normal">None (Showing all)</span>
          )}
        </div>

        <div className="text-xs text-outline font-normal">
          Showing <span className="font-semibold text-on-surface">{totalFiltered}</span> of{' '}
          <span className="font-semibold text-on-surface">{totalProducts}</span> products
        </div>
      </div>
    </div>
  );
}

