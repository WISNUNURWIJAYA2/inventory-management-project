import React from 'react';
import {
  AlertCircle,
  ShoppingCart,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { criticalAlerts } from '@/data/mockData';

export function CriticalAlertsCard({ onGenerateBatch, onPurchaseOrder }) {
  return (
    <div className="bg-surface-container-lowest p-5 rounded shadow-xs border border-outline-variant/30 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-5 h-5 text-error" />
            <h2 className="text-[15px] text-on-surface font-semibold">
              Critical Stock Alerts
            </h2>
          </div>
          <Badge variant="destructive" className="rounded-full text-[11px] font-semibold">
            3 Immediate
          </Badge>
        </div>

        <p className="text-xs text-secondary">
          Items dropped below statutory safety margins requiring purchase orders today.
        </p>

        {/* Alerts List */}
        <div className="space-y-1.5">
          {criticalAlerts.map((item) => (
            <div
              key={item.id}
              className="p-2.5 bg-surface-container-low hover:bg-surface-container rounded transition-colors flex items-center justify-between gap-2 border border-outline-variant/20"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {item.isImmediate ? (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-error" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                )}

                <div className="min-w-0">
                  <span className="text-xs text-on-surface font-semibold truncate block">
                    {item.name}
                  </span>
                  <div className="text-[11px] font-mono">
                    <span className={item.left === 0 ? 'text-error font-semibold' : 'text-secondary font-semibold'}>
                      {item.left} left
                    </span>
                    <span className="text-secondary"> (Min req: {item.minReq} {item.unit})</span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="default"
                onClick={() => onPurchaseOrder && onPurchaseOrder(item)}
                className="h-7 px-2.5 bg-primary text-on-primary hover:bg-primary-container text-xs rounded gap-1 shrink-0 shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>PO</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Footnote */}
      <div className="pt-3 mt-2 border-t border-outline-variant/20">
        <Button
          variant="secondary"
          onClick={onGenerateBatch}
          className="w-full h-8 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded flex items-center justify-center gap-1.5 font-medium"
        >
          <Receipt className="w-4 h-4 text-secondary" />
          <span>Generate Replenishment Batch (3)</span>
        </Button>
      </div>
    </div>
  );
}

