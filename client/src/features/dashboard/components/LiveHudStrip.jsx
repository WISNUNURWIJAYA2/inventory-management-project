import React from 'react';
import { ScanBarcode } from 'lucide-react';
import { liveHudData } from '@/data/mockData';

export function LiveHudStrip() {
  return (
    <div className="w-full bg-surface-container-low px-4 py-2 rounded flex flex-wrap items-center justify-between gap-2 shadow-xs border border-outline-variant/30">
      <div className="flex items-center gap-2.5 min-w-0">
        <ScanBarcode className="w-4 h-4 text-primary shrink-0" />
        <span className="text-[11px] font-mono font-semibold uppercase text-secondary">
          Live HUD:
        </span>
        <div className="flex items-center gap-1.5 overflow-hidden text-xs">
          <span className="font-mono text-[11px] px-1.5 py-0.5 bg-surface-container-lowest text-on-surface rounded border border-outline-variant/40 font-medium">
            {liveHudData.barcode}
          </span>
          <span className="text-outline font-mono text-[11px] truncate">
            → Matched: &ldquo;{liveHudData.matchedProduct}&rdquo; ({liveHudData.bayLocation})
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-outline text-[11px] font-mono">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span>{liveHudData.status}</span>
        </span>
        <span className="hidden md:inline text-secondary">{liveHudData.shortcut}</span>
      </div>
    </div>
  );
}

