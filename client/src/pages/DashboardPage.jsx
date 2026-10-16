import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Download,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { kpiMetrics } from '@/data/mockData';
import { KpiCard } from '@/features/dashboard/components/KpiCard';
import { LiveHudStrip } from '@/features/dashboard/components/LiveHudStrip';
import { StockMovementChart } from '@/features/dashboard/components/StockMovementChart';
import { CriticalAlertsCard } from '@/features/dashboard/components/CriticalAlertsCard';
import { LowStockTable } from '@/features/dashboard/components/LowStockTable';
import { RecentTransactionsTable } from '@/features/dashboard/components/RecentTransactionsTable';

export function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isHealthyPreview, setIsHealthyPreview] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Updated 2m ago');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Updated just now');
    }, 700);
  };

  return (
    <div className="flex flex-col w-full p-4 lg:p-6 space-y-6">
      {/* Breadcrumb & Top Bar Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-outline text-[11px] font-semibold tracking-wider mb-1">
            <span>OVERVIEW</span>
            <span>/</span>
            <span className="text-primary">CONSOLE</span>
          </div>
          <h1 className="text-xl sm:text-2xl text-on-surface font-semibold tracking-tight">
            Inventory Overview
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Real-time stock levels, movement velocity, and replenishments across Main Warehouse.
          </p>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Period Selector */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs gap-1.5 shadow-xs font-normal"
          >
            <Calendar className="w-3.5 h-3.5 text-outline" />
            <span>Last 30 Days (Oct 1 – Oct 31, 2024)</span>
            <ChevronDown className="w-3.5 h-3.5 text-outline ml-0.5" />
          </Button>

          {/* Export Summary Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs gap-1.5 shadow-xs font-normal"
          >
            <Download className="w-3.5 h-3.5 text-secondary" />
            <span>Export Summary</span>
          </Button>

          {/* Refresh Data Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="h-8 px-3 text-xs gap-1.5 shadow-xs font-normal group"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-secondary transition-transform duration-500 ${
                isRefreshing ? 'animate-spin text-primary' : 'group-hover:rotate-180'
              }`}
            />
            <span className="font-mono text-[11px] text-outline">{lastUpdated}</span>
          </Button>
        </div>
      </div>

      {/* 4 Compact KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.id} item={metric} />
        ))}
      </div>

      {/* Barcode Scanner Terminal Strip HUD */}
      <LiveHudStrip />

      {/* Middle Section: Stock Movement Over Time & Urgent Action Queue */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8">
          <StockMovementChart />
        </div>
        <div className="xl:col-span-4">
          <CriticalAlertsCard
            onGenerateBatch={() => alert('Batch Replenishment Generated for 3 items.')}
            onPurchaseOrder={(item) => alert(`Purchase Order initiated for ${item.name}`)}
          />
        </div>
      </div>

      {/* Operational Mode Preview / Empty State Simulation Toggle Bar */}
      <div className="bg-surface-container-lowest p-3 rounded shadow-xs border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-outline" />
          <span className="text-xs text-on-surface font-medium">
            Demonstration Filter:
          </span>
          <span className="text-xs text-secondary hidden sm:inline">
            Toggle simulated healthy warehouse state to preview the zero-alert layout.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsHealthyPreview(false)}
            className={`h-7 px-3 text-xs rounded transition-colors font-medium ${
              !isHealthyPreview
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Live Operations (Low Stock Visible)
          </button>
          <button
            type="button"
            onClick={() => setIsHealthyPreview(true)}
            className={`h-7 px-3 text-xs rounded transition-colors font-medium ${
              isHealthyPreview
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Preview All Healthy State
          </button>
        </div>
      </div>

      {/* Lower Section: Two High-Density Data Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <LowStockTable
            isHealthyState={isHealthyPreview}
            onStockIn={(item) => alert(`Stock In modal for ${item.name}`)}
          />
        </div>
        <div className="xl:col-span-5">
          <RecentTransactionsTable />
        </div>
      </div>
    </div>
  );
}

