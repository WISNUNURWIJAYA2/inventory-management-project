import React from 'react';
import { ArrowDown, ArrowUp, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TransactionsKpiBar({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 1. Today's Inbound */}
      <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Today&apos;s Inbound
          </span>
          <Badge variant="tertiary" className="rounded-full text-[11px] font-semibold gap-1">
            <ArrowDown className="w-3 h-3" />
            <span>{stats.inboundReceiptsToday} receipts</span>
          </Badge>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-tertiary">
            +{stats.inboundUnitsToday}{' '}
            <span className="text-sm font-normal text-on-surface-variant">units</span>
          </span>
          <span className="font-mono text-[11px] text-outline">
            {stats.inboundPacing}
          </span>
        </div>

        <div className="w-full bg-surface-container h-1 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-tertiary h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.inboundProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* 2. Today's Outbound */}
      <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Today&apos;s Outbound
          </span>
          <Badge variant="destructive" className="rounded-full text-[11px] font-semibold gap-1">
            <ArrowUp className="w-3 h-3" />
            <span>{stats.outboundDispatchesToday} dispatches</span>
          </Badge>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-error">
            -{stats.outboundUnitsToday}{' '}
            <span className="text-sm font-normal text-on-surface-variant">units</span>
          </span>
          <span className="font-mono text-[11px] text-outline">
            {stats.outboundPacing}
          </span>
        </div>

        <div className="w-full bg-surface-container h-1 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-error h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(stats.outboundProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* 3. Pending Dispatches */}
      <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Pending Dispatches
          </span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-on-surface">
            {stats.pendingOrders}{' '}
            <span className="text-sm font-normal text-on-surface-variant">orders</span>
          </span>
          <span className="text-xs text-primary font-semibold">Priority Pick</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-[11px] text-on-surface-variant truncate">
            {stats.pendingNote}
          </span>
        </div>
      </div>

      {/* 4. Total Ledger Operations */}
      <div className="bg-surface-container-lowest rounded-lg p-4 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
            Ledger Cycle (30d)
          </span>
          <Database className="w-4 h-4 text-outline" />
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-on-surface">
            {stats.ledgerCycle30d}{' '}
            <span className="text-sm font-normal text-on-surface-variant">ops</span>
          </span>
          <span className="font-mono text-[11px] text-tertiary font-medium">
            Zero hash mismatch
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-outline font-mono text-[11px]">
          <span>Integrity verified</span>
          <span className="font-semibold text-on-surface-variant">SHA-256</span>
        </div>
      </div>
    </div>
  );
}

