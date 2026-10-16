import React, { useState } from 'react';
import { ScanBarcode, CheckCheck, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ScannerHudPanel() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [lagMs, setLagMs] = useState(504);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setLagMs(18);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Barcode / QR Stream HUD */}
      <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <ScanBarcode className="w-4 h-4 text-primary" />
            <h3 className="text-[15px] text-on-surface font-semibold">
              Scanner Stream HUD
            </h3>
          </div>
          <Badge variant="tertiary" className="font-mono text-[11px] font-semibold">
            PORT COM4
          </Badge>
        </div>

        <div className="mt-2.5 p-2.5 rounded bg-surface-container-low font-mono text-[11px] flex flex-col gap-1 border border-outline-variant/30">
          <div className="flex items-center justify-between text-outline">
            <span>Last Scan:</span>
            <span>14:28:44.102</span>
          </div>
          <div className="text-on-surface font-semibold truncate text-xs">
            BRG-608-RS-BULK-PKG40
          </div>
          <div className="flex items-center justify-between text-tertiary">
            <span>Match: Precision Bearing 608RS</span>
            <CheckCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-on-surface-variant text-xs">
          <span>Target Bin:</span>
          <span className="font-mono font-semibold text-on-surface">
            BAY-03-RACK-B
          </span>
        </div>
      </div>

      {/* 2. Network / Replica Health Card */}
      <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">
            Replication Health
          </span>
          <Badge
            variant={lagMs > 100 ? "destructive" : "tertiary"}
            className="font-mono text-[11px] font-semibold"
          >
            Lag: {lagMs}ms
          </Badge>
        </div>

        <p className="text-xs text-on-surface-variant">
          Connection to secondary warehouse replica in Dublin is experiencing latency. Inbound transactions will queue locally.
        </p>

        <div className="pt-1 flex items-center justify-between border-t border-outline-variant/20">
          <span className="font-mono text-[11px] text-outline">
            Queue size: 0 pending
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>Retry Sync</span>
          </button>
        </div>
      </div>

      {/* 3. Bay Utilization Donut Widget */}
      <div className="bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/30 p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] text-outline uppercase tracking-wider font-semibold">
            Bay Utilization
          </span>
          <span className="text-lg text-on-surface font-bold mt-0.5">
            84.2% Full
          </span>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Rack Bay C4 is near capacity
          </span>
        </div>

        {/* Visual Mini SVG Donut */}
        <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              fill="none"
              r="15.915"
              stroke="#e0e3e5"
              strokeWidth="3.5"
            />
            <circle
              cx="18"
              cy="18"
              fill="none"
              r="15.915"
              stroke="#004ac6"
              strokeDasharray="84.2, 100"
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>
          <span className="absolute font-mono text-[11px] font-bold text-on-surface">
            84%
          </span>
        </div>
      </div>
    </div>
  );
}

