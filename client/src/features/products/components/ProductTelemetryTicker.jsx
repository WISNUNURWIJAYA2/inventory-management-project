import React from 'react';
import { Package, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export function ProductTelemetryTicker({ products }) {
  const totalCount = products.length;
  const healthyCount = products.filter((p) => p.status === 'In Stock').length;
  const belowMarginCount = products.filter((p) => p.status === 'Low Stock' || p.status === 'Critical Low').length;
  const depletedCount = products.filter((p) => p.status === 'Out of Stock' || p.stock === 0).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
      {/* 1. Total Catalog */}
      <div className="bg-surface-container-lowest p-4 rounded-lg shadow-xs border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
            Total Catalog
          </span>
          <span className="text-2xl font-bold text-on-surface mt-1 block">
            {totalCount.toLocaleString()}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
          <Package className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Healthy Stock */}
      <div className="bg-surface-container-lowest p-4 rounded-lg shadow-xs border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
            Healthy Stock
          </span>
          <span className="text-2xl font-bold text-tertiary mt-1 block">
            {healthyCount.toLocaleString()}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-tertiary-fixed/40 flex items-center justify-center text-tertiary">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Below Safety Margin */}
      <div className="bg-surface-container-lowest p-4 rounded-lg shadow-xs border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
            Below Safety Margin
          </span>
          <span className="text-2xl font-bold text-secondary mt-1 block">
            {belowMarginCount.toLocaleString()}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Depleted */}
      <div className="bg-surface-container-lowest p-4 rounded-lg shadow-xs border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
            Depleted (0 Units)
          </span>
          <span className="text-2xl font-bold text-error mt-1 block">
            {depletedCount.toLocaleString()}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-error-container/40 flex items-center justify-center text-error">
          <AlertCircle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

