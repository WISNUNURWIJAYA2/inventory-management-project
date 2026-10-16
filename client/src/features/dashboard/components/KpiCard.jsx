import React from 'react';
import {
  Package,
  AlertTriangle,
  XCircle,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  Package,
  AlertTriangle,
  XCircle,
  ArrowLeftRight
};

export function KpiCard({ item }) {
  const Icon = iconMap[item.iconName] || Package;

  return (
    <div className="bg-surface-container-lowest p-4 rounded shadow-xs hover:shadow transition-shadow flex flex-col justify-between relative overflow-hidden group border border-outline-variant/30">
      {/* Accent left colored bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${item.borderColor}`} />

      {/* Top row: Label + Value and Icon */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
            {item.title}
          </span>
          <span
            className={`text-2xl font-bold mt-1 tracking-tight ${
              item.valueColor ? item.valueColor : 'text-on-surface'
            }`}
          >
            {item.value}
          </span>
        </div>
        <div
          className={`w-9 h-9 rounded ${item.iconBg} flex items-center justify-center ${item.iconColor}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom row: Subtitle note + status badge */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-outline-variant/10 text-xs">
        <span className="text-secondary text-[11px]">{item.subtitle}</span>
        
        {item.badgeType === 'tertiary' && (
          <Badge variant="tertiary" className="gap-0.5 text-[11px] font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>{item.badgeText}</span>
          </Badge>
        )}

        {item.badgeType === 'secondary' && (
          <Badge variant="secondary" className="gap-1 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>{item.badgeText}</span>
          </Badge>
        )}

        {item.badgeType === 'destructive' && (
          <Badge variant="destructive" className="gap-1 text-[11px] font-semibold">
            <TrendingDown className="w-3 h-3" />
            <span>{item.badgeText}</span>
          </Badge>
        )}

        {item.badgeType === 'neutral' && (
          <Badge variant="neutral" className="gap-1 text-[11px] font-mono text-on-surface font-semibold">
            <span>{item.badgeText}</span>
          </Badge>
        )}
      </div>
    </div>
  );
}

